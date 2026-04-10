#!/usr/bin/env tsx

/**
 * Generate TypeScript types from BoondManager JSON schemas.
 *
 * Downloads schemas from https://doc.boondmanager.com/api-externe/raml-build/schemas/
 * and converts them to TypeScript using json-schema-to-typescript.
 *
 * Usage: npm run generate-types
 *
 * Module format:
 * - Simple string: downloads `<module>/search.json` only (legacy behavior)
 * - Object { name, schemas }: downloads each listed schema file
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { compile } from "json-schema-to-typescript";

const SCHEMA_BASE_URL = "https://doc.boondmanager.com/api-externe/raml-build/schemas";

type ModuleSpec = string | { name: string; schemas: readonly string[] };

const MODULES: readonly ModuleSpec[] = [
  // Core business modules (phase 1-2) — search-only (legacy)
  "resources",
  "candidates",
  "projects",
  "companies",
  "opportunities",
  "absences",
  "actions",
  // Commercial / financial (phase 3)
  "positionings",
  "purchases",
  "invoices",
  "orders",
  "expenses",
  "products",
  // Organizational (phase 3)
  "agencies",
  "poles",
  "calendars",
  "dashboards",
  // Admin / system (phase 3)
  "notifications",
  "validations",
  "roles",
  // Additional modules (phase 4)
  "times",
  "payments",
  "accounts",
  "contacts",
  // Phase 5: workflow report modules — multi-schema
  {
    name: "absencesReports",
    schemas: ["search", "profile", "default", "rights", "bodyPost", "bodyPut", "rejectPost"],
  },
  {
    name: "businessUnits",
    schemas: ["search", "profile", "default", "bodyPost", "bodyPut"],
  },
  {
    name: "expensesReports",
    schemas: [
      "search",
      "profile",
      "default",
      "rights",
      "bodyPost",
      "bodyPut",
      "rejectPost",
      "certificationPost",
    ],
  },
  {
    name: "billingDetails",
    schemas: ["search", "profile", "information", "bodyPost", "bodyPut"],
  },
  {
    name: "timesReports",
    schemas: [
      "search",
      "profile",
      "default",
      "rights",
      "bodyPost",
      "bodyPut",
      "rejectPost",
      "signatureBodyPost",
    ],
  },
  {
    name: "providerInvoices",
    schemas: ["search", "profile", "default", "rights", "activityExpenses", "bodyPost", "bodyPut"],
  },
  {
    name: "webhooks",
    schemas: ["search", "profile", "bodyPost", "bodyPut"],
  },
  {
    name: "deliveries",
    schemas: ["profile", "rights", "tasks", "bodyPost", "bodyPut", "send"],
  },
  // Note: "logs" schema has a malformed comment that crashes json-schema-to-typescript
];

const SCHEMA_DIR = join(import.meta.dirname, "..", "schemas");
const OUTPUT_DIR = join(import.meta.dirname, "..", "src", "generated");

interface DownloadResult {
  module: string;
  schemaName: string;
  typeName: string;
  ts: string;
}

async function downloadSchema(module: string, schemaName: string): Promise<unknown> {
  const url = `${SCHEMA_BASE_URL}/${module}/${schemaName}.json`;
  console.log(`  Downloading ${module}/${schemaName}.json...`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function pascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function schemaTypeName(module: string, schemaName: string): string {
  // e.g. "absencesReports" + "search" → "SchemasAbsencesReportsSearchJson"
  // Matches the existing convention from json-schema-to-typescript output
  return `Schemas${pascalCase(module)}${pascalCase(schemaName)}Json`;
}

async function processSchema(module: string, schemaName: string): Promise<DownloadResult | null> {
  try {
    const schema = await downloadSchema(module, schemaName);
    const schemaPath = join(SCHEMA_DIR, `${module}-${schemaName}.json`);
    await writeFile(schemaPath, JSON.stringify(schema, null, 2));

    const typeName = schemaTypeName(module, schemaName);
    const ts = await compile(schema as Record<string, unknown>, typeName, {
      bannerComment: "",
      additionalProperties: false,
      style: { semi: true, singleQuote: false },
    });

    return { module, schemaName, typeName, ts };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error(`  \u274C ${module}/${schemaName}: ${msg}`);
    return null;
  }
}

async function generateTypes(): Promise<void> {
  await mkdir(SCHEMA_DIR, { recursive: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const allTypes: string[] = [
    "/* eslint-disable */",
    "/**",
    " * Auto-generated from BoondManager JSON schemas.",
    ` * Generated on: ${new Date().toISOString().split("T")[0]}`,
    " * Source: https://doc.boondmanager.com/api-externe/",
    " * DO NOT MODIFY — run `npm run generate-types` to regenerate.",
    " */",
    "",
  ];

  for (const spec of MODULES) {
    const moduleName = typeof spec === "string" ? spec : spec.name;
    const schemaNames: readonly string[] = typeof spec === "string" ? ["search"] : spec.schemas;

    allTypes.push(`// ─── ${moduleName} ───`);
    for (const schemaName of schemaNames) {
      const result = await processSchema(moduleName, schemaName);
      if (result) {
        allTypes.push(result.ts);
        console.log(`  \u2705 ${moduleName}/${schemaName} → ${result.typeName}`);
      }
    }
    allTypes.push("");
  }

  // Write combined types file
  const outputPath = join(OUTPUT_DIR, "boond-schemas.ts");
  await writeFile(outputPath, allTypes.join("\n"));
  console.log(`\n\u2705 Types written to src/generated/boond-schemas.ts`);

  // Write barrel export (includes helpers.ts if present)
  const indexPath = join(OUTPUT_DIR, "index.ts");
  const indexContent = `export * from "./boond-schemas.js";\nexport * from "./helpers.js";\n`;
  await writeFile(indexPath, indexContent);
  console.log(`\u2705 Index written to src/generated/index.ts`);
}

console.log("\n\uD83D\uDD27 BoondManager Type Generator\n");
generateTypes().catch((err) => {
  console.error("\u274C Fatal:", err);
  process.exit(1);
});
