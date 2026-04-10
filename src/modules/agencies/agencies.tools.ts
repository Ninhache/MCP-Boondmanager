import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { AgencyAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class AgenciesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_agencies",
    description:
      "Récupère la liste paginée des agences de BoondManager. " +
      "Exemples de questions : « liste les agences », « quelles sont nos agences ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés (nom, ville)"),
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listAgencies({
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

    return executeListTool<AgencyAttributes>(
      this.boond,
      {
        path: "/agencies",
        attributeKeys: ["name", "city", "country"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_agency",
    description:
      "Récupère les informations détaillées d'une agence par son ID. " +
      "Exemples de questions : « détails de l'agence 5 », « informations sur l'agence Paris »",
    parameters: z.object({
      id: z.number().describe("ID de l'agence dans Boond"),
    }),
  })
  async getAgency({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<AgencyAttributes>>(`/agencies/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
