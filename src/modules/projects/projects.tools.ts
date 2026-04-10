import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ProjectAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

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
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listProjects({
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

    return executeListTool<ProjectAttributes>(
      this.boond,
      {
        path: "/projects",
        attributeKeys: ["reference", "typeOf", "mode", "startDate", "endDate"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_project",
    description: "Récupère les informations détaillées d'un projet / mission par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du projet dans Boond"),
    }),
  })
  async getProject({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ProjectAttributes>>(`/projects/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
