import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import { formatDetail, formatList, toTextContent } from "../../utils/formatters.js";
import { BoondClient, type JsonApiResponse } from "../boond/index.js";

const DEFAULT_PAGE_SIZE = "25";

@Injectable()
export class CandidatesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "search_candidates",
    description:
      "Recherche des candidats dans la base BoondManager. " +
      "Exemples : « trouve des développeurs Java », « candidats disponibles »",
    parameters: z.object({
      keywords: z.string().describe("Mots-clés de recherche (nom, compétences, etc.)"),
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
    }),
  })
  async searchCandidates({
    keywords,
    page,
    pageSize,
  }: {
    keywords: string;
    page?: number;
    pageSize?: number;
  }) {
    const params: Record<string, string> = {
      keywords,
      maxResults: String(pageSize ?? DEFAULT_PAGE_SIZE),
    };
    if (page) params.page = String(page);

    const data = await this.boond.get<JsonApiResponse>("/candidates", params);
    const formatted = formatList(data, ["firstName", "lastName", "email", "state", "title"]);
    return { content: [toTextContent(formatted)] };
  }

  @Tool({
    name: "get_candidate",
    description: "Récupère les informations détaillées d'un candidat par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du candidat dans Boond"),
    }),
  })
  async getCandidate({ id }: { id: number }) {
    const data = await this.boond.get<JsonApiResponse>(`/candidates/${id}`);
    const formatted = formatDetail(data);
    return { content: [toTextContent(formatted)] };
  }
}
