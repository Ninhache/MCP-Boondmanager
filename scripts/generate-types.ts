#!/usr/bin/env tsx

/**
 * Generate TypeScript types from BoondManager JSON schemas.
 *
 * Downloads schemas from https://doc.boondmanager.com/api-externe/raml-build/schemas/
 * and converts them to TypeScript using json-schema-to-typescript.
 *
 * Usage: npm run generate-types
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { compile } from "json-schema-to-typescript";

const SCHEMA_BASE_URL = "https://doc.boondmanager.com/api-externe/raml-build/schemas";

const MODULES = [
  // Core business modules (phase 1-2)
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
  // Note: "logs" schema has a malformed comment that crashes json-schema-to-typescript
  // Skip for now — can be added later if/when Boond fixes the schema
] as const;

const SCHEMA_DIR = join(import.meta.dirname, "..", "schemas");
const OUTPUT_DIR = join(import.meta.dirname, "..", "src", "generated");

async function downloadSchema(module: string): Promise<unknown> {
  const url = `${SCHEMA_BASE_URL}/${module}/search.json`;
  console.log(`  Downloading ${module}/search.json...`);

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

  for (const module of MODULES) {
    try {
      const schema = await downloadSchema(module);

      // Save raw schema
      const schemaPath = join(SCHEMA_DIR, `${module}-search.json`);
      await writeFile(schemaPath, JSON.stringify(schema, null, 2));

      // Generate TypeScript
      const typeName = `${pascalCase(module)}SearchResponse`;
      const ts = await compile(schema as Record<string, unknown>, typeName, {
        bannerComment: "",
        additionalProperties: false,
        style: { semi: true, singleQuote: false },
      });

      allTypes.push(`// ─── ${module} ───`);
      allTypes.push(ts);
      allTypes.push("");

      console.log(`  \u2705 ${module} → ${typeName}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.error(`  \u274C ${module}: ${msg}`);
    }
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
