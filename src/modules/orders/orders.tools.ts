import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, OrderAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class OrdersTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_orders",
    description:
      "Récupère la liste paginée des commandes. " +
      "Exemples : « liste les commandes », « quelles commandes sont en cours ? »",
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
  async listOrders({
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

    return executeListTool<OrderAttributes>(
      this.boond,
      {
        path: "/orders",
        attributeKeys: ["reference", "state", "startDate", "endDate"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_order",
    description:
      "Récupère les informations détaillées d'une commande par son ID. " +
      "Exemples : « détails de la commande 42 »",
    parameters: z.object({
      id: z.number().describe("ID de la commande dans Boond"),
    }),
  })
  async getOrder({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<OrderAttributes>>(`/orders/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
