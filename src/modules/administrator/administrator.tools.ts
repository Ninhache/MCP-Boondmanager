import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { AdministratorAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class AdministratorTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_administrator",
    description:
      "Récupère le profil administrateur du compte Boond (infos sur le compte et son logo).",
    parameters: z.object({}),
  })
  async getAdministrator() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<AdministratorAttributes>>("/administrator");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_administrator_logo",
    description:
      "Met à jour le logo du compte administrateur Boond. " +
      "Le logo est passé via un objet d'attributs (structure spécifique Boond).",
    parameters: z.object({
      logo: z.record(z.string(), z.unknown()).describe("Données du logo"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateAdministratorLogo({ logo }: { logo: Record<string, unknown> }) {
    try {
      const body = { data: { type: "administrator", attributes: logo } };
      const response = await this.boond.put<BoondDetailResponse>("/administrator/logo", body);
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: "✓ Administrator logo updated",
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_administrator_logo",
    description: "⚠️ Supprime le logo du compte administrateur Boond.",
    parameters: z.object({}),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteAdministratorLogo() {
    try {
      await this.boond.delete("/administrator/logo");
      return {
        content: [
          toTextContent({
            success: true,
            message: "✓ Administrator logo deleted",
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
