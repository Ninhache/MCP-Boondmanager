#!/usr/bin/env tsx

/**
 * Route validation script for the BoondManager MCP server.
 * Verifies that all API endpoints used by MCP tools are still valid
 * and return expected JSON:API attributes.
 *
 * Usage: npm run validate-routes
 * Requires: .env with Boond credentials configured
 */

import "dotenv/config";
import {
  BoondApiError,
  BoondClient,
  type BoondConfig,
  type JwtMode,
} from "../src/modules/boond/boond.client.js";

interface RouteSpec {
  name: string;
  path: string;
  expectedAttrs: string[];
}

const ROUTES: RouteSpec[] = [
  {
    name: "list_resources",
    path: "/resources",
    expectedAttrs: ["firstName", "lastName", "email", "title", "state"],
  },
  { name: "get_resource", path: "/resources/1", expectedAttrs: [] },
  {
    name: "list_projects",
    path: "/projects",
    expectedAttrs: ["name", "reference", "state", "startDate", "endDate"],
  },
  { name: "get_project", path: "/projects/1", expectedAttrs: [] },
  {
    name: "search_candidates",
    path: "/candidates?keywords=test",
    expectedAttrs: ["firstName", "lastName", "email", "state", "title"],
  },
  { name: "get_candidate", path: "/candidates/1", expectedAttrs: [] },
  {
    name: "list_companies",
    path: "/companies",
    expectedAttrs: ["name", "phone", "email", "city", "country", "state"],
  },
  { name: "get_company", path: "/companies/1", expectedAttrs: [] },
  {
    name: "list_opportunities",
    path: "/opportunities",
    expectedAttrs: ["name", "state", "startDate", "endDate", "typeOf"],
  },
  { name: "get_opportunity", path: "/opportunities/1", expectedAttrs: [] },
  {
    name: "list_absences",
    path: "/absences",
    expectedAttrs: ["startDate", "endDate", "duration", "state", "typeOf", "comment"],
  },
  {
    name: "list_actions",
    path: "/actions",
    expectedAttrs: ["name", "state", "startDate", "endDate", "typeOf"],
  },
  { name: "get_action", path: "/actions/1", expectedAttrs: [] },
];

interface ValidationResult {
  name: string;
  status: "pass" | "warn" | "fail";
  message: string;
}

async function validateRoute(client: BoondClient, route: RouteSpec): Promise<ValidationResult> {
  try {
    const data = await client.get<{ data: unknown }>(route.path);

    if (!data?.data) {
      return { name: route.name, status: "fail", message: "Response missing 'data' field" };
    }

    const items = Array.isArray(data.data) ? data.data : [data.data];

    // Detail endpoints: just check data exists
    if (route.expectedAttrs.length === 0) {
      return { name: route.name, status: "pass", message: "OK" };
    }

    // List endpoints with empty results
    if (items.length === 0) {
      return {
        name: route.name,
        status: "warn",
        message: "No data returned — cannot verify attributes",
      };
    }

    // Check attributes on first item
    const firstItem = items[0] as { attributes?: Record<string, unknown> };
    if (!firstItem?.attributes) {
      return { name: route.name, status: "fail", message: "First item has no 'attributes' field" };
    }

    const attrs = firstItem.attributes;
    const missingAttrs = route.expectedAttrs.filter((attr) => !(attr in attrs));

    if (missingAttrs.length > 0) {
      return {
        name: route.name,
        status: "warn",
        message: `Missing attributes: ${missingAttrs.join(", ")}`,
      };
    }

    const count = Array.isArray(data.data) ? items.length : 1;
    return { name: route.name, status: "pass", message: `OK (${count} items)` };
  } catch (error) {
    if (error instanceof BoondApiError) {
      return {
        name: route.name,
        status: "fail",
        message: `HTTP ${error.status}: ${error.statusText}`,
      };
    }
    const msg = error instanceof Error ? error.message : "Unknown error";
    return { name: route.name, status: "fail", message: msg };
  }
}

function printResults(results: ValidationResult[]): void {
  const icons = { pass: "✅", warn: "⚠️", fail: "❌" };

  console.log("\n🔍 BoondManager Route Validation\n");
  console.log("─".repeat(70));

  for (const r of results) {
    const icon = icons[r.status];
    console.log(`${icon}  ${r.name.padEnd(25)} ${r.message}`);
  }

  console.log("─".repeat(70));

  const passed = results.filter((r) => r.status === "pass").length;
  const warned = results.filter((r) => r.status === "warn").length;
  const failed = results.filter((r) => r.status === "fail").length;

  console.log(`\n✅ ${passed} passed  ⚠️ ${warned} warnings  ❌ ${failed} failed\n`);
}

// ─── Main ───────────────────────────────────────────────────────

const baseUrl = process.env.BOOND_API_URL;
if (!baseUrl) {
  console.error("❌ BOOND_API_URL environment variable is required");
  process.exit(1);
}

const authMode = process.env.BOOND_AUTH_MODE ?? "basic";
if (authMode !== "basic" && authMode !== "jwt") {
  console.error(`❌ Invalid BOOND_AUTH_MODE "${authMode}": must be "basic" or "jwt"`);
  process.exit(1);
}

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

const client = new BoondClient(config);
const results: ValidationResult[] = [];

for (const route of ROUTES) {
  const result = await validateRoute(client, route);
  results.push(result);
}

printResults(results);

const hasFailures = results.some((r) => r.status === "fail");
process.exit(hasFailures ? 1 : 0);
