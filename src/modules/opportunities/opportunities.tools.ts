import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type {
  BoondDetailResponse,
  BoondListResponse,
  OpportunityAttributes,
} from "../../generated/index.js";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, formatList, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class OpportunitiesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_opportunities",
    description:
      "Récupère la liste paginée des opportunités commerciales. " +
      "Exemples : « quelles sont les opportunités en cours ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés"),
    }),
  })
  async listOpportunities({
    page,
    pageSize,
    keywords,
  }: {
    page?: number;
    pageSize?: number;
    keywords?: string;
  }) {
    const params: Record<string, string> = {
      maxResults: String(pageSize ?? DEFAULT_PAGE_SIZE),
    };
    if (page != null) params.page = String(page);
    if (keywords) params.keywords = keywords;

    try {
      const data = await this.boond.get<BoondListResponse<OpportunityAttributes>>(
        "/opportunities",
        params,
      );
      const formatted = formatList(data, ["name", "state", "startDate", "endDate", "typeOf"]);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_opportunity",
    description: "Récupère les informations détaillées d'une opportunité par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de l'opportunité dans Boond"),
    }),
  })
  async getOpportunity({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<OpportunityAttributes>>(
        `/opportunities/${id}`,
      );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
