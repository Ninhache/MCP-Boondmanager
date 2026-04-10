import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { TimeAttributes } from "../../generated/index.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

// Note: Boond's /times/{id} detail endpoint returns 404 for most tenants.
// Times are typically accessed via their parent time report
// (timesReport sub-resource on /resources/{id}/timesReport).
// Keeping list-only for now.

@Injectable()
export class TimesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_times",
    description:
      "Récupère la liste paginée des temps saisis (CRA / time reports). " +
      "Exemples : « qui a saisi ses temps ce mois ? », « liste les temps du collaborateur X »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés"),
      fetchAll: z
        .boolean()
        .optional()
        .describe("Si true, récupère toutes les pages jusqu'à la limite de sécurité"),
    }),
  })
  async listTimes({
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

    return executeListTool<TimeAttributes>(
      this.boond,
      {
        path: "/times",
        attributeKeys: ["category"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }
}
