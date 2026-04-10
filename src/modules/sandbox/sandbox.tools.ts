import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class SandboxTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "create_sandbox",
    description:
      "Crée un environnement sandbox pour tester l'API Boond. " +
      "Utile pour les développeurs d'apps marketplace.",
    parameters: z.object({
      attributes: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("Attributs optionnels pour la sandbox"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createSandbox({ attributes }: { attributes?: Record<string, unknown> }) {
    try {
      const body = { data: { type: "sandbox", attributes: attributes ?? {} } };
      const response = await this.boond.post<BoondDetailResponse>("/sandbox", body);
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Sandbox created with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "connect_sandbox",
    description: "Récupère l'URL de connexion à une sandbox Boond.",
    parameters: z.object({}),
  })
  async connectSandbox() {
    try {
      const data = await this.boond.get<BoondDetailResponse>("/sandbox/connect");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
