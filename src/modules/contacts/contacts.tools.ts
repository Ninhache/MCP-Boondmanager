import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ContactAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class ContactsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_contacts",
    description:
      "Récupère la liste paginée des contacts (interlocuteurs chez les clients). " +
      "Exemples : « liste les contacts chez ACME », « quels sont nos interlocuteurs ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés (nom, email, société)"),
      fetchAll: z
        .boolean()
        .optional()
        .describe("Si true, récupère toutes les pages jusqu'à la limite de sécurité"),
    }),
  })
  async listContacts({
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

    return executeListTool<ContactAttributes>(
      this.boond,
      {
        path: "/contacts",
        attributeKeys: ["firstName", "lastName", "email1", "phone1", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_contact",
    description: "Récupère les détails d'un contact par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du contact dans Boond"),
    }),
  })
  async getContact({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ContactAttributes>>(`/contacts/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
