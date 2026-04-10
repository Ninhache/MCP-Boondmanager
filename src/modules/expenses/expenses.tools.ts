import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ExpenseAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

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
        attributeKeys: ["reference", "state", "date", "amount"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_expense",
    description:
      "Récupère les informations détaillées d'une note de frais par son ID. " +
      "Exemples : « détails de la note de frais 42 »",
    parameters: z.object({
      id: z.number().describe("ID de la note de frais dans Boond"),
    }),
  })
  async getExpense({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ExpenseAttributes>>(`/expenses/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
