import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

type ImportableEntity = "actions" | "opportunities" | "candidates" | "resources" | "contacts";

async function runImport(
  client: BoondClient,
  entity: ImportableEntity,
  payload: Record<string, unknown>,
) {
  try {
    const body = { data: { type: entity, attributes: payload } };
    const response = await client.post<BoondDetailResponse>(`/import/${entity}`, body);
    const formatted = formatDetail(response);
    return {
      content: [
        toTextContent({
          success: true,
          message: `✓ Import ${entity} submitted`,
          resource: formatted,
        }),
      ],
    };
  } catch (error) {
    return handleBoondError(error);
  }
}

@Injectable()
export class ImportTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "import_actions",
    description:
      "Importe en masse une liste d'actions dans Boond. Payload = structure CSV-like " +
      "ou tableau d'objets à importer.",
    parameters: z.object({
      payload: z.record(z.string(), z.unknown()).describe("Payload d'import (structure Boond)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async importActions({ payload }: { payload: Record<string, unknown> }) {
    return runImport(this.boond, "actions", payload);
  }

  @Tool({
    name: "import_opportunities",
    description: "Importe en masse une liste d'opportunités dans Boond.",
    parameters: z.object({
      payload: z.record(z.string(), z.unknown()).describe("Payload d'import"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async importOpportunities({ payload }: { payload: Record<string, unknown> }) {
    return runImport(this.boond, "opportunities", payload);
  }

  @Tool({
    name: "import_candidates",
    description: "Importe en masse une liste de candidats dans Boond.",
    parameters: z.object({
      payload: z.record(z.string(), z.unknown()).describe("Payload d'import"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async importCandidates({ payload }: { payload: Record<string, unknown> }) {
    return runImport(this.boond, "candidates", payload);
  }

  @Tool({
    name: "import_resources",
    description: "Importe en masse une liste de collaborateurs (resources) dans Boond.",
    parameters: z.object({
      payload: z.record(z.string(), z.unknown()).describe("Payload d'import"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async importResources({ payload }: { payload: Record<string, unknown> }) {
    return runImport(this.boond, "resources", payload);
  }

  @Tool({
    name: "import_contacts",
    description: "Importe en masse une liste de contacts dans Boond.",
    parameters: z.object({
      payload: z.record(z.string(), z.unknown()).describe("Payload d'import"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async importContacts({ payload }: { payload: Record<string, unknown> }) {
    return runImport(this.boond, "contacts", payload);
  }
}
