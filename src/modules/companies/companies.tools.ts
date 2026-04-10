import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, CompanyAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
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
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listCompanies({
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

    return executeListTool<CompanyAttributes>(
      this.boond,
      {
        path: "/companies",
        attributeKeys: ["name", "phone1", "town", "country", "state", "website"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
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
