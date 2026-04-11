#!/usr/bin/env tsx

/**
 * Refresh the canonical snapshot of BoondManager routes.
 *
 * Walks the public RAML spec and writes the resulting (path, verbs) map
 * to `docs/boond-routes-canonical.json`.
 *
 * Usage:
 *   npm run refresh-boond-routes
 *
 * Network: ~400 HTTP requests (parallel), ~10s total.
 * No browser, no YAML parser, zero runtime dependencies beyond Node `fetch`.
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { walkBoondRaml } from "./boond-raml-walker.ts";

const OUT_PATH = join(import.meta.dirname, "..", "docs", "boond-routes-canonical.json");

interface Snapshot {
  generatedAt: string;
  sourceUrl: string;
  totals: {
    routes: number;
    actions: number;
    routesExcludingApps: number;
    actionsExcludingApps: number;
  };
  routes: { path: string; verbs: string[] }[];
}

async function main(): Promise<void> {
  console.log("🔧 Walking BoondManager RAML spec...\n");

  const fullResult = await walkBoondRaml({});
  const noAppsResult = await walkBoondRaml({ excludeApps: true });

  console.log(`  ✓ ${fullResult.routes.length} routes, ${fullResult.totalActions} actions (total)`);
  console.log(
    `  ✓ ${noAppsResult.routes.length} routes, ${noAppsResult.totalActions} actions (hors /apps)`,
  );
  console.log(
    `  ⏱  ${(fullResult.elapsedMs / 1000).toFixed(2)}s, ${fullResult.fetchCount} fetches`,
  );

  const snapshot: Snapshot = {
    generatedAt: new Date().toISOString(),
    sourceUrl: "https://doc.boondmanager.com/api-externe/raml-build/api-externe.raml",
    totals: {
      routes: fullResult.routes.length,
      actions: fullResult.totalActions,
      routesExcludingApps: noAppsResult.routes.length,
      actionsExcludingApps: noAppsResult.totalActions,
    },
    routes: fullResult.routes,
  };

  // Diff against existing snapshot (if any)
  let previousSnapshot: Snapshot | null = null;
  try {
    const existing = await readFile(OUT_PATH, "utf8");
    previousSnapshot = JSON.parse(existing) as Snapshot;
  } catch {
    // No previous snapshot
  }

  if (previousSnapshot) {
    const prevPaths = new Set(previousSnapshot.routes.map((r) => r.path));
    const newPaths = new Set(fullResult.routes.map((r) => r.path));
    const added = [...newPaths].filter((p) => !prevPaths.has(p));
    const removed = [...prevPaths].filter((p) => !newPaths.has(p));

    if (added.length > 0) {
      console.log(`\n  ➕ ${added.length} new routes:`);
      for (const p of added.slice(0, 20)) console.log(`     ${p}`);
      if (added.length > 20) console.log(`     ... and ${added.length - 20} more`);
    }
    if (removed.length > 0) {
      console.log(`\n  ➖ ${removed.length} removed routes:`);
      for (const p of removed.slice(0, 20)) console.log(`     ${p}`);
      if (removed.length > 20) console.log(`     ... and ${removed.length - 20} more`);
    }
    if (added.length === 0 && removed.length === 0) {
      console.log("\n  ✓ No changes detected");
    }
  }

  await writeFile(OUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`\n✅ Snapshot written to docs/boond-routes-canonical.json`);
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`❌ Fatal: ${message}`);
  process.exit(1);
});
