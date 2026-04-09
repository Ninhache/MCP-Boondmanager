import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import { formatDetail, formatList, toTextContent } from "../../utils/formatters.js";
// biome-ignore lint/style/useImportType: BoondClient is needed at runtime for NestJS DI
import { BoondClient, type JsonApiResponse } from "../boond/index.js";

const DEFAULT_PAGE_SIZE = "25";

@Injectable()
export class ProjectsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_projects",
    description:
      "Récupère la liste paginée des projets / missions. " +
      "Exemples : « quels sont les projets en cours ? », « liste les missions »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés"),
    }),
  })
  async listProjects({
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

    const data = await this.boond.get<JsonApiResponse>("/projects", params);
    const formatted = formatList(data, ["name", "reference", "state", "startDate", "endDate"]);
    return { content: [toTextContent(formatted)] };
  }

  @Tool({
    name: "get_project",
    description: "Récupère les informations détaillées d'un projet / mission par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du projet dans Boond"),
    }),
  })
  async getProject({ id }: { id: number }) {
    const data = await this.boond.get<JsonApiResponse>(`/projects/${id}`);
    const formatted = formatDetail(data);
    return { content: [toTextContent(formatted)] };
  }
}
