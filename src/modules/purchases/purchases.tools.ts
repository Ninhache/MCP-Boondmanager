import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, PurchaseAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class PurchasesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_purchases",
    description:
      "Récupère la liste paginée des achats. " +
      "Exemples : « liste les achats », « quels sont les achats en cours ? »",
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
  async listPurchases({
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

    return executeListTool<PurchaseAttributes>(
      this.boond,
      {
        path: "/purchases",
        attributeKeys: ["reference", "state", "startDate", "endDate"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_purchase",
    description:
      "Récupère les informations détaillées d'un achat par son ID. " +
      "Exemples : « détails de l'achat 42 »",
    parameters: z.object({
      id: z.number().describe("ID de l'achat dans Boond"),
    }),
  })
  async getPurchase({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<PurchaseAttributes>>(
        `/purchases/${id}`,
      );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
