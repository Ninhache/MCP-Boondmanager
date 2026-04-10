import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, TimesReportAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeActionTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const TIMES_REPORTS_CONFIG = {
  path: "/times-reports",
  resourceType: "timesreport",
} as const;

@Injectable()
export class TimesReportsTools {
  constructor(private readonly boond: BoondClient) {}

  // ─── Read tools ─────────────────────────────────────────

  @Tool({
    name: "list_times_reports",
    description:
      "Récupère la liste paginée des feuilles de temps (CRA — Compte Rendu d'Activité). " +
      "Exemples : « liste les CRA du mois », « qui a saisi ses temps ? »",
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
  async listTimesReports({
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

    return executeListTool<TimesReportAttributes>(
      this.boond,
      {
        path: TIMES_REPORTS_CONFIG.path,
        attributeKeys: ["creationDate", "state", "term"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_times_report",
    description: "Récupère les détails d'une feuille de temps par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de temps"),
    }),
  })
  async getTimesReport({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<TimesReportAttributes>>(
        `/times-reports/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_times_report_default",
    description: "Récupère le template par défaut pour créer une nouvelle feuille de temps.",
    parameters: z.object({}),
  })
  async getTimesReportDefault() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<TimesReportAttributes>>("/times-reports/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_times_report_rights",
    description: "Récupère les permissions de l'utilisateur sur une feuille de temps.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de temps"),
    }),
  })
  async getTimesReportRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/times-reports/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Write tools ────────────────────────────────────────

  @Tool({
    name: "create_times_report",
    description:
      "Crée une nouvelle feuille de temps pour un collaborateur. " +
      "Nécessite le resource ID et la période (term).",
    parameters: z.object({
      resourceId: z.string().describe("ID du collaborateur (resource.data.id)"),
      term: z.string().describe("Période au format YYYY-MM (ex: 2026-04)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createTimesReport({ resourceId, term }: { resourceId: string; term: string }) {
    try {
      const body = {
        data: {
          type: "timesreport",
          attributes: { term },
          relationships: {
            resource: { data: { id: resourceId, type: "resource" } },
          },
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(TIMES_REPORTS_CONFIG.path, body);
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created times report with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_times_report",
    description: "Met à jour une feuille de temps existante.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de temps"),
      informationComments: z.string().optional().describe("Commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateTimesReport({
    id,
    informationComments,
  }: {
    id: number;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, TIMES_REPORTS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_times_report",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une feuille de temps. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de temps à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteTimesReport({ id }: { id: number }) {
    return executeDeleteTool(this.boond, TIMES_REPORTS_CONFIG, id);
  }

  // ─── Workflow action tools ──────────────────────────────

  @Tool({
    name: "validate_times_report",
    description: "Valide (approuve) une feuille de temps.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de temps"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async validateTimesReport({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/times-reports/${id}/validate`,
      `Times report ${id} validated`,
    );
  }

  @Tool({
    name: "unvalidate_times_report",
    description: "Annule la validation d'une feuille de temps.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de temps"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async unvalidateTimesReport({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/times-reports/${id}/unvalidate`,
      `Times report ${id} unvalidated`,
    );
  }

  @Tool({
    name: "reject_times_report",
    description: "⚠️ Rejette une feuille de temps avec un motif.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de temps"),
      reason: z.string().optional().describe("Motif du rejet"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async rejectTimesReport({ id, reason }: { id: number; reason?: string }) {
    const body = reason ? { data: { attributes: { reason } } } : undefined;
    return executeActionTool(
      this.boond,
      `/times-reports/${id}/reject`,
      `Times report ${id} rejected`,
      body,
    );
  }

  @Tool({
    name: "sign_times_report",
    description:
      "Appose une signature électronique sur une feuille de temps. " +
      "Action finale qui scelle la feuille.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de temps"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async signTimesReport({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/times-reports/${id}/signature`,
      `Times report ${id} signed`,
    );
  }

  // ─── Download tool ──────────────────────────────────────

  @Tool({
    name: "download_times_report",
    description: "Télécharge la feuille de temps au format fichier (PDF).",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de temps"),
    }),
  })
  async downloadTimesReport({ id }: { id: number }) {
    try {
      const data = await this.boond.get<unknown>(`/times-reports/${id}/download`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Downloaded times report ${id}`,
            data,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
