#!/usr/bin/env tsx

/**
 * Route validation script for the BoondManager MCP server.
 * Verifies that all API endpoints used by MCP tools are still valid
 * and return expected JSON:API attributes.
 *
 * Usage: npm run validate-routes
 * Requires: .env with Boond credentials configured
 *
 * Detail routes derive their IDs from a prior list call — no hardcoded IDs.
 * Exit code: 1 if any route fails, 0 otherwise.
 */

import "dotenv/config";
import {
  BoondApiError,
  BoondClient,
  type BoondConfig,
  type JwtMode,
} from "../src/modules/boond/boond.client.js";

interface ListRouteSpec {
  kind: "list";
  name: string;
  path: string;
  params?: Record<string, string>;
  expectedAttrs: string[];
  /** Key used to derive a detail route from the first result */
  detailName?: string;
}

interface DetailRouteSpec {
  kind: "detail";
  name: string;
  basePath: string;
}

type RouteSpec = ListRouteSpec | DetailRouteSpec;

const ROUTES: RouteSpec[] = [
  {
    kind: "list",
    name: "list_resources",
    path: "/resources",
    expectedAttrs: ["firstName", "lastName", "email", "title", "state"],
    detailName: "get_resource",
  },
  {
    kind: "list",
    name: "list_projects",
    path: "/projects",
    expectedAttrs: ["name", "reference", "state", "startDate", "endDate"],
    detailName: "get_project",
  },
  {
    kind: "list",
    name: "search_candidates",
    path: "/candidates",
    params: { keywords: "test" },
    expectedAttrs: ["firstName", "lastName", "email", "state", "title"],
    detailName: "get_candidate",
  },
  {
    kind: "list",
    name: "list_companies",
    path: "/companies",
    expectedAttrs: ["name", "phone", "email", "city", "country", "state"],
    detailName: "get_company",
  },
  {
    kind: "list",
    name: "list_opportunities",
    path: "/opportunities",
    expectedAttrs: ["name", "state", "startDate", "endDate", "typeOf"],
    detailName: "get_opportunity",
  },
  {
    kind: "list",
    name: "list_absences",
    path: "/absences",
    expectedAttrs: ["startDate", "endDate", "duration", "state", "typeOf", "comment"],
  },
  {
    kind: "list",
    name: "list_actions",
    path: "/actions",
    expectedAttrs: ["name", "state", "startDate", "endDate", "typeOf"],
    detailName: "get_action",
  },
];

interface ValidationResult {
  name: string;
  status: "pass" | "warn" | "fail";
  message: string;
}

interface JsonApiItem {
  id: string;
  attributes?: Record<string, unknown>;
}

async function validateListRoute(
  client: BoondClient,
  route: ListRouteSpec,
): Promise<{ result: ValidationResult; firstId: string | null }> {
  try {
    const data = await client.get<{ data: unknown }>(route.path, route.params);

    if (!data?.data) {
      return {
        result: { name: route.name, status: "fail", message: "Response missing 'data' field" },
        firstId: null,
      };
    }

    const items = (Array.isArray(data.data) ? data.data : [data.data]) as JsonApiItem[];
    const firstId = items[0]?.id ?? null;

    if (route.expectedAttrs.length === 0) {
      return { result: { name: route.name, status: "pass", message: "OK" }, firstId };
    }

    if (items.length === 0) {
      return {
        result: { name: route.name, status: "warn", message: "No data — cannot verify attributes" },
        firstId: null,
      };
    }

    const firstItem = items[0];
    if (!firstItem?.attributes) {
      return {
        result: { name: route.name, status: "fail", message: "First item has no 'attributes'" },
        firstId,
      };
    }

    const attrs = firstItem.attributes;
    const missing = route.expectedAttrs.filter((a) => !(a in attrs));

    if (missing.length > 0) {
      return {
        result: { name: route.name, status: "warn", message: `Missing: ${missing.join(", ")}` },
        firstId,
      };
    }

    return {
      result: { name: route.name, status: "pass", message: `OK (${items.length} items)` },
      firstId,
    };
  } catch (error) {
    if (error instanceof BoondApiError) {
      return {
        result: {
          name: route.name,
          status: "fail",
          message: `HTTP ${error.status}: ${error.statusText}`,
        },
        firstId: null,
      };
    }
    const msg = error instanceof Error ? error.message : "Unknown error";
    return { result: { name: route.name, status: "fail", message: msg }, firstId: null };
  }
}

async function validateDetailRoute(
  client: BoondClient,
  name: string,
  path: string,
): Promise<ValidationResult> {
  try {
    const data = await client.get<{ data: unknown }>(path);
    if (!data?.data) {
      return { name, status: "fail", message: "Response missing 'data' field" };
    }
    return { name, status: "pass", message: "OK" };
  } catch (error) {
    if (error instanceof BoondApiError) {
      return { name, status: "fail", message: `HTTP ${error.status}: ${error.statusText}` };
    }
    const msg = error instanceof Error ? error.message : "Unknown error";
    return { name, status: "fail", message: msg };
  }
}

function printResults(results: ValidationResult[]): void {
  const icons = { pass: "\u2705", warn: "\u26A0\uFE0F", fail: "\u274C" };

  console.log("\n\uD83D\uDD0D BoondManager Route Validation\n");
  console.log("\u2500".repeat(70));

  for (const r of results) {
    const icon = icons[r.status];
    console.log(`${icon}  ${r.name.padEnd(25)} ${r.message}`);
  }

  console.log("\u2500".repeat(70));

  const passed = results.filter((r) => r.status === "pass").length;
  const warned = results.filter((r) => r.status === "warn").length;
  const failed = results.filter((r) => r.status === "fail").length;

  console.log(
    `\n\u2705 ${passed} passed  \u26A0\uFE0F ${warned} warnings  \u274C ${failed} failed\n`,
  );
}

// ─── Main ───────────────────────────────────────────────────────

const baseUrl = process.env.BOOND_API_URL;
if (!baseUrl) {
  console.error("\u274C BOOND_API_URL environment variable is required");
  process.exit(1);
}

const authMode = process.env.BOOND_AUTH_MODE ?? "basic";
if (authMode !== "basic" && authMode !== "jwt") {
  console.error(`\u274C Invalid BOOND_AUTH_MODE "${authMode}": must be "basic" or "jwt"`);
  process.exit(1);
}

let client: BoondClient;
try {
  const config: BoondConfig = {
    baseUrl,
    authMode,
    username: process.env.BOOND_USERNAME,
    password: process.env.BOOND_PASSWORD,
    userToken: process.env.BOOND_USER_TOKEN,
    appToken: process.env.BOOND_APP_TOKEN,
    appKey: process.env.BOOND_APP_KEY,
    clientToken: process.env.BOOND_CLIENT_TOKEN,
    godClientToken: process.env.BOOND_GOD_CLIENT_TOKEN,
    jwtMode: (process.env.BOOND_JWT_MODE as JwtMode) ?? "normal",
  };
  client = new BoondClient(config);
} catch (error) {
  const msg = error instanceof Error ? error.message : "Unknown error";
  console.error(`\u274C Failed to initialize BoondClient: ${msg}`);
  process.exit(1);
}

const results: ValidationResult[] = [];

for (const route of ROUTES) {
  if (route.kind === "list") {
    const { result, firstId } = await validateListRoute(client, route);
    results.push(result);

    // Derive detail route from first list result
    if (route.detailName && firstId) {
      const detailResult = await validateDetailRoute(
        client,
        route.detailName,
        `${route.path}/${firstId}`,
      );
      results.push(detailResult);
    } else if (route.detailName) {
      results.push({
        name: route.detailName,
        status: "warn",
        message: "Skipped — no ID from list",
      });
    }
  }
}

printResults(results);

const hasFailures = results.some((r) => r.status === "fail");
process.exit(hasFailures ? 1 : 0);
