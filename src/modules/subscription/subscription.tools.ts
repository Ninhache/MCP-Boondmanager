import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, SubscriptionAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class SubscriptionTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_subscription",
    description: "Récupère les détails de l'abonnement Boond du compte courant.",
    parameters: z.object({}),
  })
  async getSubscription() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<SubscriptionAttributes>>("/subscription");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "list_subscription_invoices",
    description: "Récupère la liste des factures liées à l'abonnement Boond du compte.",
    parameters: z.object({}),
  })
  async listSubscriptionInvoices() {
    try {
      const data = await this.boond.get<BoondDetailResponse>("/subscription/invoices");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "download_subscription_invoice",
    description: "Télécharge une facture d'abonnement Boond (PDF).",
    parameters: z.object({
      id: z.number().describe("ID de la facture d'abonnement"),
    }),
  })
  async downloadSubscriptionInvoice({ id }: { id: number }) {
    try {
      const data = await this.boond.get<unknown>(`/subscription/invoices/${id}/download`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Downloaded subscription invoice ${id}`,
            data,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_subscription",
    description:
      "Met à jour l'abonnement Boond du compte (changement de plan, options). " +
      "Utiliser get_subscription au préalable pour connaître la structure.",
    parameters: z.object({
      attributes: z
        .record(z.string(), z.unknown())
        .describe("Objet d'attributs à appliquer (ex: plan, options, etc.)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateSubscription({ attributes }: { attributes: Record<string, unknown> }) {
    try {
      const body = { data: { type: "subscription", attributes } };
      const response = await this.boond.put<BoondDetailResponse>("/subscription", body);
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: "✓ Subscription updated",
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
