import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import { formatDetail, formatList, toTextContent } from "../../utils/formatters.js";
// biome-ignore lint/style/useImportType: BoondClient is needed at runtime for NestJS DI
import { BoondClient, type JsonApiResponse } from "../boond/index.js";

const DEFAULT_PAGE_SIZE = "25";

@Injectable()
export class ResourcesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_resources",
    description:
      "Récupère la liste paginée des collaborateurs (resources) de BoondManager. " +
      "Exemples de questions : « liste mes collaborateurs », « qui travaille chez nous ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés (nom, prénom, email)"),
    }),
  })
  async listResources({
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
    if (page) params.page = String(page);
    if (keywords) params.keywords = keywords;

    const data = await this.boond.get<JsonApiResponse>("/resources", params);
    const formatted = formatList(data, ["firstName", "lastName", "email", "title", "state"]);
    return { content: [toTextContent(formatted)] };
  }

  @Tool({
    name: "get_resource",
    description:
      "Récupère les informations détaillées d'un collaborateur par son ID. " +
      "Peut retourner un onglet spécifique (information, projects, absences, etc.).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur dans Boond"),
      tab: z
        .string()
        .optional()
        .describe(
          "Onglet spécifique : information, projects, absences, timesReport, expensesReport",
        ),
    }),
  })
  async getResource({ id, tab }: { id: number; tab?: string }) {
    const path = tab ? `/resources/${id}/${tab}` : `/resources/${id}`;
    const data = await this.boond.get<JsonApiResponse>(path);
    const formatted = formatDetail(data);
    return { content: [toTextContent(formatted)] };
  }
}
