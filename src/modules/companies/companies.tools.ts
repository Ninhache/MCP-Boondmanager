import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type {
  BoondDetailResponse,
  BoondListResponse,
  CompanyAttributes,
} from "../../generated/index.js";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, formatList, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class CompaniesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_companies",
    description:
      "Récupère la liste paginée des sociétés (companies) de BoondManager. " +
      "Exemples de questions : « liste les sociétés », « quels sont nos clients ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés (nom, ville, email)"),
    }),
  })
  async listCompanies({
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
      const data = await this.boond.get<BoondListResponse<CompanyAttributes>>("/companies", params);
      const formatted = formatList(data, ["name", "phone", "email", "city", "country", "state"]);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company",
    description:
      "Récupère les informations détaillées d'une société par son ID. " +
      "Exemples de questions : « détails de la société 42 », « informations sur le client X »",
    parameters: z.object({
      id: z.number().describe("ID de la société dans Boond"),
    }),
  })
  async getCompany({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<CompanyAttributes>>(`/companies/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
