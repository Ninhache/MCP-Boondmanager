import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { ActionAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class ActionsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_actions",
    description:
      "Récupère la liste paginée des actions commerciales. " +
      "Exemples : « quelles sont les actions récentes ? », « liste les actions en cours »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés"),
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listActions({
    page,
    pageSize,
    keywords,
    fetchAll,
  }: {
    page?: number;
    pageSize?: number;
    keywords?: string;
    fetchAll?: boolean;
  }) {
    const extraParams: Record<string, string> = {};
    if (keywords) extraParams.keywords = keywords;

    return executeListTool<ActionAttributes>(
      this.boond,
      {
        path: "/actions",
        attributeKeys: ["name", "state", "startDate", "endDate", "typeOf"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_action",
    description: "Récupère les informations détaillées d'une action commerciale par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de l'action commerciale dans Boond"),
    }),
  })
  async getAction({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ActionAttributes>>(`/actions/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
