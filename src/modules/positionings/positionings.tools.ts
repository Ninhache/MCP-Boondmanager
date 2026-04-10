import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, PositioningAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class PositioningsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_positionings",
    description:
      "Récupère la liste paginée des positionnements (affectations de candidats sur missions). " +
      "Exemples : « liste les positionnements », « quels candidats sont positionnés sur des missions ? »",
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
  async listPositionings({
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

    return executeListTool<PositioningAttributes>(
      this.boond,
      {
        path: "/positionings",
        attributeKeys: ["state", "startDate", "endDate", "typeOf"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_positioning",
    description:
      "Récupère les informations détaillées d'un positionnement par son ID. " +
      "Exemples : « détails du positionnement 42 »",
    parameters: z.object({
      id: z.number().describe("ID du positionnement dans Boond"),
    }),
  })
  async getPositioning({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<PositioningAttributes>>(
        `/positionings/${id}`,
      );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
