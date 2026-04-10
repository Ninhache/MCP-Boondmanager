import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, PoleAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class PolesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_poles",
    description:
      "Récupère la liste paginée des pôles de BoondManager. " +
      "Exemples de questions : « liste les pôles », « quels sont nos pôles ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés (nom)"),
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listPoles({
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

    return executeListTool<PoleAttributes>(
      this.boond,
      {
        path: "/poles",
        attributeKeys: ["name"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_pole",
    description:
      "Récupère les informations détaillées d'un pôle par son ID. " +
      "Exemples de questions : « détails du pôle 3 », « informations sur le pôle technique »",
    parameters: z.object({
      id: z.number().describe("ID du pôle dans Boond"),
    }),
  })
  async getPole({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<PoleAttributes>>(`/poles/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
