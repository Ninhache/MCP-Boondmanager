import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ResourceAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
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
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listResources({
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

    return executeListTool<ResourceAttributes>(
      this.boond,
      {
        path: "/resources",
        attributeKeys: ["firstName", "lastName", "email1", "title", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
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
