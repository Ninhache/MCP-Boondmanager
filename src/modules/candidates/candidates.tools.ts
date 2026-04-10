import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, CandidateAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

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
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async searchCandidates({
    keywords,
    page,
    pageSize,
    fetchAll,
  }: {
    keywords: string;
    page?: number;
    pageSize?: number;
    fetchAll?: boolean;
  }) {
    return executeListTool<CandidateAttributes>(
      this.boond,
      {
        path: "/candidates",
        attributeKeys: ["firstName", "lastName", "email1", "state", "title"],
      },
      { page, pageSize, fetchAll, extraParams: { keywords } },
    );
  }

  @Tool({
    name: "get_candidate",
    description: "Récupère les informations détaillées d'un candidat par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du candidat dans Boond"),
    }),
  })
  async getCandidate({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<CandidateAttributes>>(
        `/candidates/${id}`,
      );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
