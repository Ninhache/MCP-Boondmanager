import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BankingTransactionAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { executeUpdateTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const BANKING_TRANSACTIONS_CONFIG = {
  path: "/banking-transactions",
  resourceType: "bankingtransaction",
} as const;

@Injectable()
export class BankingTransactionsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_banking_transactions",
    description:
      "Récupère la liste paginée des transactions bancaires (rapprochement comptable). " +
      "Exemples : « liste les transactions bancaires », « quelles transactions non rapprochées ? »",
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
  async listBankingTransactions({
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

    return executeListTool<BankingTransactionAttributes>(
      this.boond,
      {
        path: BANKING_TRANSACTIONS_CONFIG.path,
        attributeKeys: ["date", "amount", "label", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_banking_transaction",
    description: "Récupère les détails d'une transaction bancaire par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la transaction bancaire"),
    }),
  })
  async getBankingTransaction({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<BankingTransactionAttributes>>(
        `/banking-transactions/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_banking_transaction",
    description:
      "Met à jour une transaction bancaire existante (rapprochement, commentaire, état).",
    parameters: z.object({
      id: z.number().describe("ID de la transaction"),
      state: z.number().optional().describe("Nouvel état (ref. Boond)"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateBankingTransaction({
    id,
    state,
    informationComments,
  }: {
    id: number;
    state?: number;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (state !== undefined) attributes.state = state;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, BANKING_TRANSACTIONS_CONFIG, id, attributes);
  }
}
