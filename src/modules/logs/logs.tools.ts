import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class LogsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_logs",
    description:
      "Récupère les journaux système Boond (audit trail des actions utilisateurs). " +
      "Note: pas de schéma typé côté Boond — la réponse est renvoyée brute.",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page"),
      keywords: z.string().optional().describe("Recherche par mots-clés"),
    }),
  })
  async listLogs({
    page,
    pageSize,
    keywords,
  }: {
    page?: number;
    pageSize?: number;
    keywords?: string;
  }) {
    try {
      const params = new URLSearchParams();
      if (page !== undefined) params.set("page", String(page));
      if (pageSize !== undefined) params.set("maxResults", String(pageSize));
      if (keywords) params.set("keywords", keywords);
      const query = params.toString();
      const data = await this.boond.get<BoondDetailResponse>(`/logs${query ? `?${query}` : ""}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_log",
    description: "Récupère les détails d'un log système par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du log"),
    }),
  })
  async getLog({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/logs/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
