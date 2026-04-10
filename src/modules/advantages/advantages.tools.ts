import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { AdvantageAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeDeleteTool, executeUpdateTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const ADVANTAGES_CONFIG = {
  path: "/advantages",
  resourceType: "advantage",
} as const;

@Injectable()
export class AdvantagesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_advantage",
    description:
      "Récupère les détails d'un avantage social (ticket restaurant, mutuelle, etc.) par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de l'avantage"),
    }),
  })
  async getAdvantage({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<AdvantageAttributes>>(
        `/advantages/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_advantage_default",
    description: "Récupère le template par défaut pour créer un nouvel avantage social.",
    parameters: z.object({}),
  })
  async getAdvantageDefault() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<AdvantageAttributes>>("/advantages/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_advantage_rights",
    description: "Récupère les permissions de l'utilisateur sur un avantage social.",
    parameters: z.object({
      id: z.number().describe("ID de l'avantage"),
    }),
  })
  async getAdvantageRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/advantages/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_advantage",
    description:
      "Crée un nouvel avantage social attaché à un contrat (tickets restaurant, mutuelle, etc.). " +
      "Nécessite l'ID du contrat via relationships.contract.",
    parameters: z.object({
      contractId: z.string().describe("ID du contrat parent (contract.data.id)"),
      startDate: z.string().optional().describe("Date de début (ISO 8601)"),
      endDate: z.string().optional().describe("Date de fin (ISO 8601)"),
      typeOf: z.number().optional().describe("Type d'avantage (ref. Boond)"),
      amount: z.number().optional().describe("Montant"),
      informationComments: z.string().optional().describe("Commentaire libre"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createAdvantage({
    contractId,
    startDate,
    endDate,
    typeOf,
    amount,
    informationComments,
  }: {
    contractId: string;
    startDate?: string;
    endDate?: string;
    typeOf?: number;
    amount?: number;
    informationComments?: string;
  }) {
    try {
      const attributes: Record<string, unknown> = {};
      if (startDate !== undefined) attributes.startDate = startDate;
      if (endDate !== undefined) attributes.endDate = endDate;
      if (typeOf !== undefined) attributes.typeOf = typeOf;
      if (amount !== undefined) attributes.amount = amount;
      if (informationComments !== undefined) attributes.informationComments = informationComments;

      const body = {
        data: {
          type: "advantage",
          attributes,
          relationships: {
            contract: { data: { id: contractId, type: "contract" } },
          },
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(ADVANTAGES_CONFIG.path, body);
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created advantage with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_advantage",
    description: "Met à jour un avantage social existant.",
    parameters: z.object({
      id: z.number().describe("ID de l'avantage"),
      startDate: z.string().optional().describe("Nouvelle date de début"),
      endDate: z.string().optional().describe("Nouvelle date de fin"),
      typeOf: z.number().optional().describe("Nouveau type"),
      amount: z.number().optional().describe("Nouveau montant"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateAdvantage({
    id,
    startDate,
    endDate,
    typeOf,
    amount,
    informationComments,
  }: {
    id: number;
    startDate?: string;
    endDate?: string;
    typeOf?: number;
    amount?: number;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (startDate !== undefined) attributes.startDate = startDate;
    if (endDate !== undefined) attributes.endDate = endDate;
    if (typeOf !== undefined) attributes.typeOf = typeOf;
    if (amount !== undefined) attributes.amount = amount;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, ADVANTAGES_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_advantage",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un avantage social. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de l'avantage à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteAdvantage({ id }: { id: number }) {
    return executeDeleteTool(this.boond, ADVANTAGES_CONFIG, id);
  }
}
