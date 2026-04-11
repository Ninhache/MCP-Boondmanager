#!/usr/bin/env tsx

/**
 * Offline route coverage validator.
 *
 * Scans `src/modules/` for all MCP tool calls and extracts the (path, verb)
 * pairs that map to BoondManager API endpoints. Compares the resulting map
 * against the canonical snapshot at `docs/boond-routes-canonical.json`
 * (refreshed via `npm run refresh-boond-routes`) and prints a coverage report.
 *
 * Usage:
 *   npm run validate-routes
 *   npm run validate-routes -- --strict           # Exit 1 if any drift / uncovered
 *   npm run validate-routes -- --module=webhooks  # Focus one module + list missing routes
 *
 * Supported call patterns (all found in src/modules/):
 *   - boond.get/post/put/delete/patch<T>("/foo/${id}")   → explicit verb + path
 *   - executeListTool(client, { path: "/foo" }, ...)     → GET /foo
 *   - executeListTool(client, FOO_CONFIG, ...)           → GET + lookup config.path
 *   - executeCreateTool(client, FOO_CONFIG, ...)         → POST /foo
 *   - executeUpdateTool(client, FOO_CONFIG, id, ...)     → PUT  /foo/{id}
 *   - executeDeleteTool(client, FOO_CONFIG, id)          → DELETE /foo/{id}
 *   - executeActionTool(client, "/foo/{id}/validate",..) → POST /foo/{id}/validate
 *
 * Zero network. Reads the cached snapshot, scans source files with regex.
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SNAPSHOT_PATH = join(ROOT, "docs", "boond-routes-canonical.json");
const MODULES_DIR = join(ROOT, "src", "modules");

interface Snapshot {
  generatedAt: string;
  routes: { path: string; verbs: string[] }[];
}

interface Action {
  module: string;
  verb: string;
  rawPath: string;
  normalizedPath: string;
  source: string; // how it was detected
}

// ─────────────────────────────────────────────────────────────────────
// Path normalization
// ─────────────────────────────────────────────────────────────────────

function normalizePath(raw: string): string {
  let p = raw.split("?")[0];
  p = p.replace(/\$\{[^}]+\}/g, "{id}");
  p = p.replace(/\{[a-zA-Z_]+\}/g, "{id}");
  p = p.replace(/\/+$/, "") || "/";
  return p;
}

function normalizeCanonical(p: string): string {
  return p.replace(/\{[a-zA-Z_]+\}/g, "{id}").replace(/\/+$/, "") || "/";
}

// ─────────────────────────────────────────────────────────────────────
// Scanning
// ─────────────────────────────────────────────────────────────────────

// Config path declarations: `const FOO_CONFIG = { path: "/foo", ... }`
const CONFIG_RE = /const\s+(\w+_CONFIG)\s*=\s*\{[^}]*?path:\s*["'`](\/[^"'`]+)["'`]/gs;

// Any verb mention inside a method body — helpers and direct calls
const VERB_MARKER_RE =
  /\b(executeListTool|executeCreateTool|executeUpdateTool|executeDeleteTool|executeActionTool|boond\.(?:get|post|put|delete|patch))\b/g;

// String / template literals starting with `/` (path candidates)
const PATH_LITERAL_RE = /[`'"](\/[a-zA-Z0-9/_\-{}$?=&.:]+)[`'"]/g;

// Method start markers inside an MCP tool class — parameter block may span
// multiple lines or contain destructured types, so we match the method name
// then walk forward to find the body opening brace
const METHOD_START_RE = /^\s{2,4}async\s+(\w+)\s*\(/gm;

const HELPER_TO_VERB: Record<string, string> = {
  executeListTool: "GET",
  executeCreateTool: "POST",
  executeUpdateTool: "PUT",
  executeDeleteTool: "DELETE",
  executeActionTool: "POST",
};

function inferVerbsFromMarkers(body: string): Set<string> {
  const verbs = new Set<string>();
  for (const m of body.matchAll(VERB_MARKER_RE)) {
    const marker = m[1];
    if (marker.startsWith("boond.")) {
      verbs.add(marker.slice(6).toUpperCase());
    } else {
      const v = HELPER_TO_VERB[marker];
      if (v) verbs.add(v);
    }
  }
  return verbs;
}

function extractPathLiterals(body: string): string[] {
  const out: string[] = [];
  for (const m of body.matchAll(PATH_LITERAL_RE)) {
    out.push(m[1]);
  }
  return out;
}

/**
 * Split a tool class into per-method chunks (method body only).
 * Uses the `async methodName(...) {` marker and naive brace balancing.
 */
function splitMethods(content: string): { name: string; body: string }[] {
  const methods: { name: string; body: string }[] = [];
  const markers = [...content.matchAll(METHOD_START_RE)];
  for (const marker of markers) {
    const start = marker.index ?? 0;
    const name = marker[1];
    // Walk forward: first match paren depth → 0, then find the next `{` = body start
    let parenDepth = 0;
    let bodyOpen = -1;
    for (let j = start; j < content.length; j++) {
      const ch = content[j];
      if (ch === "(") parenDepth++;
      else if (ch === ")") {
        parenDepth--;
        if (parenDepth === 0) {
          // Look for the opening brace after the params
          const braceIdx = content.indexOf("{", j);
          if (braceIdx >= 0) bodyOpen = braceIdx;
          break;
        }
      }
    }
    if (bodyOpen < 0) continue;

    // Balance body braces
    let depth = 0;
    let end = content.length;
    for (let j = bodyOpen; j < content.length; j++) {
      const ch = content[j];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          end = j + 1;
          break;
        }
      }
    }
    methods.push({ name, body: content.slice(bodyOpen, end) });
  }
  return methods;
}

async function scanModuleFile(module: string, file: string): Promise<Action[]> {
  const content = await readFile(file, "utf8");
  const actions: Action[] = [];

  // Build *_CONFIG → path map (module-scoped)
  const configPaths = new Map<string, string>();
  for (const m of content.matchAll(CONFIG_RE)) {
    configPaths.set(m[1], m[2]);
  }

  // Split into methods and process each
  const methods = splitMethods(content);

  for (const method of methods) {
    const verbs = inferVerbsFromMarkers(method.body);
    if (verbs.size === 0) continue;

    const literals = extractPathLiterals(method.body);

    // Detect helper-based calls → get base path from config
    const helperMatches = [
      ...method.body.matchAll(
        /\b(executeListTool|executeCreateTool|executeUpdateTool|executeDeleteTool)\s*(?:<[^(]*>)?\s*\(\s*this\.boond\s*,\s*(\w+|\{[^}]*?\})/gs,
      ),
    ];
    for (const hm of helperMatches) {
      const helper = hm[1];
      const arg = hm[2].trim();
      const verb = HELPER_TO_VERB[helper];
      if (!verb) continue;
      let basePath: string | undefined;
      if (configPaths.has(arg)) basePath = configPaths.get(arg);
      else {
        const inline = arg.match(/path:\s*["'`](\/[^"'`]+)["'`]/);
        if (inline) basePath = inline[1];
      }
      if (!basePath) continue;
      const fullPath = verb === "PUT" || verb === "DELETE" ? `${basePath}/{id}` : basePath;
      actions.push({
        module,
        verb,
        rawPath: fullPath,
        normalizedPath: normalizePath(fullPath),
        source: `${method.name}:${helper}`,
      });
    }

    // Direct string / template path literals in the method body
    // Associate them with any explicit verb found via boond.verb(
    const explicitVerbMatches = [
      ...method.body.matchAll(/\bboond\.(get|post|put|delete|patch)\b/g),
    ];
    const explicitVerbs = new Set(explicitVerbMatches.map((m) => m[1].toUpperCase()));

    // Path literals + executeActionTool path literal
    // If the method has a `this.boond.verb(varName)` call, we associate
    // the verb with all literals in the method body.
    for (const raw of literals) {
      // Skip obvious non-route strings (file paths, urls, etc.)
      // biome-ignore lint/suspicious/noTemplateCurlyInString: intentional literal match
      if (raw.includes("${BASE}") || raw.startsWith("/dist") || raw.startsWith("/node_modules")) {
        continue;
      }

      // Case 1: explicit verb + literal (most common)
      for (const v of explicitVerbs) {
        actions.push({
          module,
          verb: v,
          rawPath: raw,
          normalizedPath: normalizePath(raw),
          source: `${method.name}:literal(${v})`,
        });
      }

      // Case 2: executeActionTool literal → POST
      if (method.body.includes("executeActionTool") && !explicitVerbs.has("POST")) {
        actions.push({
          module,
          verb: "POST",
          rawPath: raw,
          normalizedPath: normalizePath(raw),
          source: `${method.name}:executeActionTool`,
        });
      }
    }
  }

  return actions;
}

async function scanAllModules(moduleFilter?: string): Promise<Action[]> {
  const actions: Action[] = [];
  const mods = await readdir(MODULES_DIR);
  for (const mod of mods) {
    if (moduleFilter && mod !== moduleFilter) continue;
    const toolsFile = join(MODULES_DIR, mod, `${mod}.tools.ts`);
    try {
      const modActions = await scanModuleFile(mod, toolsFile);
      actions.push(...modActions);
    } catch {
      // Module has no tools.ts (like boond infra module)
    }
  }
  return actions;
}

// ─────────────────────────────────────────────────────────────────────
// Reporting
// ─────────────────────────────────────────────────────────────────────

interface ModuleCoverage {
  module: string;
  boondActions: number;
  covered: number;
  missing: { path: string; verbs: string[] }[];
}

function buildCanonicalIndex(snapshot: Snapshot): Map<string, Set<string>> {
  const index = new Map<string, Set<string>>();
  for (const r of snapshot.routes) {
    const norm = normalizeCanonical(r.path);
    const set = index.get(norm) ?? new Set<string>();
    for (const v of r.verbs) set.add(v);
    index.set(norm, set);
  }
  return index;
}

function formatPct(n: number, total: number): string {
  if (total === 0) return "  —  ";
  return `${((n / total) * 100).toFixed(1).padStart(5)}%`;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const strict = args.includes("--strict");
  const moduleArg = args.find((a) => a.startsWith("--module="))?.split("=")[1];

  let snapshot: Snapshot;
  try {
    const raw = await readFile(SNAPSHOT_PATH, "utf8");
    snapshot = JSON.parse(raw) as Snapshot;
  } catch {
    console.error("❌ No canonical snapshot at docs/boond-routes-canonical.json");
    console.error("   Run `npm run refresh-boond-routes` first.");
    process.exit(1);
    return;
  }

  const canonicalIndex = buildCanonicalIndex(snapshot);
  const actions = await scanAllModules(moduleArg);

  // Build set of (verb, path) actually called
  const calledSet = new Set<string>();
  const orphans: Action[] = [];
  for (const a of actions) {
    const verbs = canonicalIndex.get(a.normalizedPath);
    if (!verbs?.has(a.verb)) {
      orphans.push(a);
      continue;
    }
    calledSet.add(`${a.verb} ${a.normalizedPath}`);
  }

  const totalActions = snapshot.routes.reduce((n, r) => n + r.verbs.length, 0);
  const totalActionsNoApps = snapshot.routes
    .filter((r) => !r.path.startsWith("/apps"))
    .reduce((n, r) => n + r.verbs.length, 0);

  let coveredTotal = 0;
  let coveredNoApps = 0;
  for (const r of snapshot.routes) {
    const norm = normalizeCanonical(r.path);
    for (const v of r.verbs) {
      if (calledSet.has(`${v} ${norm}`)) {
        coveredTotal++;
        if (!r.path.startsWith("/apps")) coveredNoApps++;
      }
    }
  }

  console.log("\n🔍 Route coverage report");
  console.log(`   Snapshot:   ${snapshot.generatedAt}`);
  console.log(`   Canonical:  ${snapshot.routes.length} routes, ${totalActions} actions`);
  console.log(`   Scanned:    ${actions.length} tool calls (${orphans.length} orphans)\n`);

  console.log("📊 Global coverage:");
  console.log(
    `   Total:       ${String(coveredTotal).padStart(3)}/${totalActions}  ${formatPct(coveredTotal, totalActions)}`,
  );
  console.log(
    `   Hors /apps:  ${String(coveredNoApps).padStart(3)}/${totalActionsNoApps}  ${formatPct(coveredNoApps, totalActionsNoApps)}`,
  );

  // Per-module coverage (hors /apps)
  const byModule = new Map<string, { path: string; verbs: string[] }[]>();
  for (const r of snapshot.routes) {
    if (r.path.startsWith("/apps")) continue;
    const firstSegment = r.path.split("/").filter(Boolean)[0];
    if (!firstSegment) continue;
    const list = byModule.get(firstSegment) ?? [];
    list.push(r);
    byModule.set(firstSegment, list);
  }

  const perModule: ModuleCoverage[] = [];
  for (const [mod, routes] of byModule) {
    const boondActions = routes.reduce((n, r) => n + r.verbs.length, 0);
    let covered = 0;
    const missing: { path: string; verbs: string[] }[] = [];
    for (const r of routes) {
      const norm = normalizeCanonical(r.path);
      const missVerbs: string[] = [];
      for (const v of r.verbs) {
        if (calledSet.has(`${v} ${norm}`)) covered++;
        else missVerbs.push(v);
      }
      if (missVerbs.length > 0) missing.push({ path: r.path, verbs: missVerbs });
    }
    perModule.push({ module: mod, boondActions, covered, missing });
  }

  perModule.sort((a, b) => b.boondActions - b.covered - (a.boondActions - a.covered));

  console.log("\n📦 Per-module coverage (hors /apps):");
  console.log(`   ${"module".padEnd(30)}${"covered".padStart(10)}${"%".padStart(9)}  gap`);
  console.log(`   ${"-".repeat(62)}`);
  for (const m of perModule) {
    const gap = m.boondActions - m.covered;
    const pct = formatPct(m.covered, m.boondActions);
    const label = `${m.covered}/${m.boondActions}`.padStart(10);
    const gapStr = gap > 0 ? `−${gap}` : "✓";
    console.log(`   ${m.module.padEnd(30)}${label}${pct}  ${gapStr}`);
  }

  if (moduleArg) {
    const focus = perModule.find((m) => m.module === moduleArg);
    if (focus && focus.missing.length > 0) {
      console.log(`\n🔎 Missing routes in '${moduleArg}':`);
      for (const m of focus.missing) {
        for (const v of m.verbs) console.log(`     ${v.padEnd(7)} ${m.path}`);
      }
    }
  }

  if (orphans.length > 0) {
    console.log(`\n⚠️  ${orphans.length} orphan tool call(s) (path not in Boond RAML):`);
    for (const o of orphans.slice(0, 20)) {
      console.log(`     ${o.verb.padEnd(7)} ${o.rawPath}  (${o.module}, ${o.source})`);
    }
    if (orphans.length > 20) console.log(`     ... and ${orphans.length - 20} more`);
  }

  console.log("");
  if (strict && (orphans.length > 0 || coveredNoApps < totalActionsNoApps)) {
    console.error("❌ Coverage check failed (strict mode)");
    process.exit(1);
    return;
  }
  console.log("✅ Coverage report complete");
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`❌ Fatal: ${message}`);
  process.exit(1);
});
