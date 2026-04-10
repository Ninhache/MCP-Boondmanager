import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { AbsencesReportAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeActionTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const ABSENCES_REPORTS_CONFIG = {
  path: "/absences-reports",
  resourceType: "absencesreport",
} as const;

@Injectable()
export class AbsencesReportsTools {
  constructor(private readonly boond: BoondClient) {}

  // ─── Read tools ─────────────────────────────────────────

  @Tool({
    name: "list_absences_reports",
    description:
      "Récupère la liste paginée des demandes d'absences / feuilles de congés. " +
      "Exemples : « liste les demandes de congés », « qui a posé des congés ce mois ? »",
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
  async listAbsencesReports({
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

    return executeListTool<AbsencesReportAttributes>(
      this.boond,
      {
        path: ABSENCES_REPORTS_CONFIG.path,
        attributeKeys: ["creationDate", "state", "absencesPeriods"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_absences_report",
    description: "Récupère les détails d'une demande d'absences par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la demande d'absences"),
    }),
  })
  async getAbsencesReport({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<AbsencesReportAttributes>>(
        `/absences-reports/${id}`,
      );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_absences_report_default",
    description:
      "Récupère le template par défaut pour créer une nouvelle demande d'absences. " +
      "Utile pour connaître les champs obligatoires avant un create.",
    parameters: z.object({}),
  })
  async getAbsencesReportDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<AbsencesReportAttributes>>(
        "/absences-reports/default",
      );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_absences_report_rights",
    description: "Récupère les permissions de l'utilisateur sur une demande d'absences.",
    parameters: z.object({
      id: z.number().describe("ID de la demande d'absences"),
    }),
  })
  async getAbsencesReportRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/absences-reports/${id}/rights`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Write tools ────────────────────────────────────────

  @Tool({
    name: "create_absences_report",
    description:
      "Crée une nouvelle demande d'absences pour un collaborateur. " +
      "Nécessite au minimum le resource ID et une période (startDate, endDate, workUnitType).",
    parameters: z.object({
      resourceId: z
        .string()
        .describe("ID du collaborateur concerné (relationship resource.data.id)"),
      informationComments: z.string().optional().describe("Commentaire libre"),
      absencesPeriods: z
        .array(
          z.object({
            startDate: z.string().describe("Date de début (ISO 8601)"),
            endDate: z.string().describe("Date de fin (ISO 8601)"),
            duration: z.number().describe("Durée en jours"),
            title: z.string().describe("Titre de la période"),
            workUnitTypeReference: z.number().describe("Référence du type de congé"),
          }),
        )
        .describe("Liste des périodes d'absence"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createAbsencesReport({
    resourceId,
    informationComments,
    absencesPeriods,
  }: {
    resourceId: string;
    informationComments?: string;
    absencesPeriods: Array<{
      startDate: string;
      endDate: string;
      duration: number;
      title: string;
      workUnitTypeReference: number;
    }>;
  }) {
    // Build the JSON:API body manually because of the nested relationship structure
    try {
      const body = {
        data: {
          type: "absencesreport",
          attributes: {
            ...(informationComments && { informationComments }),
            absencesPeriods: absencesPeriods.map((p) => ({
              startDate: p.startDate,
              endDate: p.endDate,
              duration: p.duration,
              title: p.title,
              workUnitType: { reference: p.workUnitTypeReference },
            })),
          },
          relationships: {
            resource: {
              data: { id: resourceId, type: "resource" },
            },
          },
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(
        ABSENCES_REPORTS_CONFIG.path,
        body,
      );
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created absences report with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_absences_report",
    description: "Met à jour une demande d'absences existante.",
    parameters: z.object({
      id: z.number().describe("ID de la demande à modifier"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateAbsencesReport({
    id,
    informationComments,
  }: {
    id: number;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (informationComments !== undefined) attributes.informationComments = informationComments;

    return executeUpdateTool(this.boond, ABSENCES_REPORTS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_absences_report",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une demande d'absences. " +
      "Cette opération est irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de la demande à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteAbsencesReport({ id }: { id: number }) {
    return executeDeleteTool(this.boond, ABSENCES_REPORTS_CONFIG, id);
  }

  // ─── Workflow action tools ──────────────────────────────

  @Tool({
    name: "validate_absences_report",
    description: "Valide (approuve) une demande d'absences. Workflow d'approbation.",
    parameters: z.object({
      id: z.number().describe("ID de la demande à valider"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async validateAbsencesReport({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/absences-reports/${id}/validate`,
      `Absences report ${id} validated`,
    );
  }

  @Tool({
    name: "unvalidate_absences_report",
    description: "Annule la validation d'une demande d'absences (retour au statut en attente).",
    parameters: z.object({
      id: z.number().describe("ID de la demande"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async unvalidateAbsencesReport({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/absences-reports/${id}/unvalidate`,
      `Absences report ${id} unvalidated`,
    );
  }

  @Tool({
    name: "reject_absences_report",
    description: "⚠️ Rejette une demande d'absences avec un motif.",
    parameters: z.object({
      id: z.number().describe("ID de la demande à rejeter"),
      reason: z.string().optional().describe("Motif du rejet (optionnel)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async rejectAbsencesReport({ id, reason }: { id: number; reason?: string }) {
    const body = reason ? { data: { attributes: { reason } } } : undefined;
    return executeActionTool(
      this.boond,
      `/absences-reports/${id}/reject`,
      `Absences report ${id} rejected`,
      body,
    );
  }

  // ─── Download tool ──────────────────────────────────────

  @Tool({
    name: "download_absences_report",
    description:
      "Télécharge la demande d'absences au format PDF/fichier. Retourne l'URL ou les métadonnées du fichier.",
    parameters: z.object({
      id: z.number().describe("ID de la demande à télécharger"),
    }),
  })
  async downloadAbsencesReport({ id }: { id: number }) {
    try {
      const data = await this.boond.get<unknown>(`/absences-reports/${id}/download`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Downloaded absences report ${id}`,
            data,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
