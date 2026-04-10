import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ShareAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class ShareTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_share_default",
    description:
      "Récupère le template par défaut pour partager un profil (candidate/resource) " +
      "avec d'autres utilisateurs Boond.",
    parameters: z.object({}),
  })
  async getShareDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<ShareAttributes>>("/share/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_share",
    description:
      "Partage un profil (candidate/resource) avec un ou plusieurs destinataires " +
      "(email ou utilisateur Boond interne).",
    parameters: z.object({
      attributes: z
        .record(z.string(), z.unknown())
        .describe("Attributs du partage : profil source, destinataires, message, etc."),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createShare({ attributes }: { attributes: Record<string, unknown> }) {
    try {
      const body = { data: { type: "share", attributes } };
      const response = await this.boond.post<BoondDetailResponse>("/share", body);
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: "✓ Share created",
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
