import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { AccountAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class AccountsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_accounts",
    description:
      "Récupère la liste paginée des comptes utilisateurs (managers). " +
      "Exemples : « liste les managers », « qui a accès à Boond ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés (nom, email)"),
      fetchAll: z
        .boolean()
        .optional()
        .describe("Si true, récupère toutes les pages jusqu'à la limite de sécurité"),
    }),
  })
  async listAccounts({
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

    return executeListTool<AccountAttributes>(
      this.boond,
      {
        path: "/accounts",
        attributeKeys: ["firstName", "lastName", "email", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_account",
    description: "Récupère les détails d'un compte utilisateur par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du compte dans Boond"),
    }),
  })
  async getAccount({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<AccountAttributes>>(`/accounts/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
