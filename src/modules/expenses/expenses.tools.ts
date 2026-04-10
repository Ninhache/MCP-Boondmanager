import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { ExpenseAttributes } from "../../generated/index.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

// Note: Boond's /expenses/{id} detail endpoint returns 404 for most tenants.
// Expenses are typically accessed via their parent expense report
// (expensesReport sub-resource on /resources/{id}/expensesReport).
// Keeping list-only for now.

@Injectable()
export class ExpensesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_expenses",
    description:
      "Récupère la liste paginée des notes de frais. " +
      "Exemples : « liste les notes de frais », « quelles dépenses sont en attente de validation ? »",
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
  async listExpenses({
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

    return executeListTool<ExpenseAttributes>(
      this.boond,
      {
        path: "/expenses",
        attributeKeys: ["category"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }
}
