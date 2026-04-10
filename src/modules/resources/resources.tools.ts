import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type {
  BoondDetailResponse,
  BoondListResponse,
  ResourceAttributes,
} from "../../generated/index.js";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, formatList, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

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
    if (page != null) params.page = String(page);
    if (keywords) params.keywords = keywords;

    try {
      const data = await this.boond.get<BoondListResponse<ResourceAttributes>>(
        "/resources",
        params,
      );
      const formatted = formatList(data, ["firstName", "lastName", "email", "title", "state"]);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource",
    description:
      "Récupère les informations détaillées d'un collaborateur par son ID. " +
      "Peut retourner un onglet spécifique (information, projects, absences, etc.).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur dans Boond"),
      tab: z
        .enum(["information", "projects", "absences", "timesReport", "expensesReport"])
        .optional()
        .describe("Onglet spécifique à récupérer"),
    }),
  })
  async getResource({ id, tab }: { id: number; tab?: string }) {
    const path = tab ? `/resources/${id}/${tab}` : `/resources/${id}`;
    try {
      const data = await this.boond.get<BoondDetailResponse<ResourceAttributes>>(path);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
