import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ProductAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class ProductsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_products",
    description:
      "Récupère la liste paginée des produits. " +
      "Exemples : « liste les produits », « quels produits sont disponibles ? »",
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
  async listProducts({
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

    return executeListTool<ProductAttributes>(
      this.boond,
      {
        path: "/products",
        attributeKeys: ["reference", "name", "priceExcludingTax"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_product",
    description: "Récupère les informations détaillées d'un produit par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du produit dans Boond"),
    }),
  })
  async getProduct({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ProductAttributes>>(`/products/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
