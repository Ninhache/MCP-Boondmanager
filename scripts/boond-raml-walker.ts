/**
 * Shared RAML walker that extracts all (path, verbs) combinations from
 * the BoondManager public RAML spec at
 *   https://doc.boondmanager.com/api-externe/raml-build/api-externe.raml
 *
 * The RAML spec is served as static text. Each file exposes HTTP verbs at
 * column 0 (`get:`, `post:`, `put:`, `delete:`, `patch:`) and nested routes
 * as `!include` references. We walk the include tree recursively with
 * simple regex parsing — no YAML parser, no browser, no heavy deps.
 *
 * Used by both `refresh-boond-routes.ts` (refresh cached snapshot) and
 * `validate-routes.ts` (compare snapshot vs source code).
 */

const VERB_RE = /^(get|post|put|delete|patch):/gm;
const INCLUDE_RE = /^(\/\S+):\s*!include\s+(\S+\.raml)/gm;
const RAML_BASE_URL = "https://doc.boondmanager.com/api-externe/raml-build/";
const ROOT_RAML_URL = `${RAML_BASE_URL}api-externe.raml`;

export interface BoondRoute {
  /** Canonical path, e.g. "/absences-reports/{id}/rights" */
  path: string;
  /** HTTP verbs supported on this path, uppercase */
  verbs: string[];
}

export interface WalkResult {
  routes: BoondRoute[];
  totalActions: number;
  fetchCount: number;
  elapsedMs: number;
}

const cache = new Map<string, Promise<string>>();

function fetchCached(url: string): Promise<string> {
  const existing = cache.get(url);
  if (existing) return existing;
  const p = fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
    return r.text();
  });
  cache.set(url, p);
  return p;
}

async function walk(url: string, pathSoFar: string): Promise<BoondRoute[]> {
  let text: string;
  try {
    text = await fetchCached(url);
  } catch {
    return [];
  }
  const verbs = [...text.matchAll(VERB_RE)].map((m) => m[1].toUpperCase());
  const includes = [...text.matchAll(INCLUDE_RE)];

  const routes: BoondRoute[] = verbs.length ? [{ path: pathSoFar || "/", verbs }] : [];

  const childResults = await Promise.all(
    includes.map(([, subPath, subFile]) => {
      const childUrl = new URL(subFile, url).toString();
      return walk(childUrl, pathSoFar + subPath);
    }),
  );
  for (const children of childResults) routes.push(...children);
  return routes;
}

export interface WalkOptions {
  /** If true, exclude routes starting with /apps (large deferred subsystem) */
  excludeApps?: boolean;
}

/**
 * Walk the BoondManager RAML spec and return all discoverable routes.
 */
export async function walkBoondRaml(options: WalkOptions = {}): Promise<WalkResult> {
  const t0 = Date.now();
  cache.clear();
  const root = await fetchCached(ROOT_RAML_URL);
  const topLevel = [...root.matchAll(INCLUDE_RE)].filter(([, path]) =>
    options.excludeApps ? !path.startsWith("/apps") : true,
  );

  const results = await Promise.all(
    topLevel.map(([, path, file]) => {
      const url = new URL(file, ROOT_RAML_URL).toString();
      return walk(url, path);
    }),
  );
  const routes = results.flat();

  // Deduplicate: same path can appear twice via different includes
  const merged = new Map<string, Set<string>>();
  for (const r of routes) {
    const set = merged.get(r.path) ?? new Set<string>();
    for (const v of r.verbs) set.add(v);
    merged.set(r.path, set);
  }
  const dedup: BoondRoute[] = [...merged.entries()]
    .map(([path, verbSet]) => ({ path, verbs: [...verbSet].sort() }))
    .sort((a, b) => a.path.localeCompare(b.path));

  const totalActions = dedup.reduce((n, r) => n + r.verbs.length, 0);
  return {
    routes: dedup,
    totalActions,
    fetchCount: cache.size,
    elapsedMs: Date.now() - t0,
  };
}
