import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { AlertAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const ALERTS_CONFIG = {
  path: "/alerts",
  resourceType: "alert",
} as const;

@Injectable()
export class AlertsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_alerts",
    description:
      "Récupère la liste des alertes du tableau de bord (dépassements, échéances, etc.).",
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
  async listAlerts({
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

    return executeListTool<AlertAttributes>(
      this.boond,
      {
        path: ALERTS_CONFIG.path,
        attributeKeys: ["title", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_alert_values",
    description: "Récupère les valeurs détaillées d'une alerte (ex: liste des entités concernées).",
    parameters: z.object({
      id: z.number().describe("ID de l'alerte"),
    }),
  })
  async getAlertValues({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/alerts/${id}/values`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_alerts_configuration",
    description: "Récupère la configuration des alertes (seuils, types d'alertes actives, etc.).",
    parameters: z.object({}),
  })
  async getAlertsConfiguration() {
    try {
      const data = await this.boond.get<BoondDetailResponse>("/alerts/configuration");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_alerts_configuration",
    description:
      "Met à jour la configuration des alertes. " +
      "Les champs sont spécifiques au paramétrage Boond — utiliser get_alerts_configuration au préalable pour connaître la structure.",
    parameters: z.object({
      configuration: z
        .record(z.string(), z.unknown())
        .describe("Objet de configuration complet (attributes à remplacer)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateAlertsConfiguration({ configuration }: { configuration: Record<string, unknown> }) {
    try {
      const body = {
        data: {
          type: "alert",
          attributes: configuration,
        },
      };
      const response = await this.boond.put<BoondDetailResponse>("/alerts/configuration", body);
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: "✓ Alerts configuration updated",
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
