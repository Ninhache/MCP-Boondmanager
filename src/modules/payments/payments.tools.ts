import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, PaymentAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class PaymentsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_payments",
    description:
      "Récupère la liste paginée des paiements. " +
      "Exemples : « quels paiements sont en attente ? », « liste les paiements reçus »",
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
  async listPayments({
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

    return executeListTool<PaymentAttributes>(
      this.boond,
      {
        path: "/payments",
        attributeKeys: ["date", "state", "number", "amountIncludingTax"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_payment",
    description: "Récupère les détails d'un paiement par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du paiement dans Boond"),
    }),
  })
  async getPayment({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<PaymentAttributes>>(`/payments/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
