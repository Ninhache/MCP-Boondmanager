import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ExpensesReportAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeActionTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const EXPENSES_REPORTS_CONFIG = {
  path: "/expenses-reports",
  resourceType: "expensesreport",
} as const;

@Injectable()
export class ExpensesReportsTools {
  constructor(private readonly boond: BoondClient) {}

  // ─── Read tools ─────────────────────────────────────────

  @Tool({
    name: "list_expenses_reports",
    description:
      "Récupère la liste paginée des feuilles de frais. " +
      "Exemples : « liste les feuilles de frais en attente », « quelles notes de frais ce mois ? »",
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
  async listExpensesReports({
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

    return executeListTool<ExpensesReportAttributes>(
      this.boond,
      {
        path: EXPENSES_REPORTS_CONFIG.path,
        attributeKeys: ["creationDate", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_expenses_report",
    description: "Récupère les détails d'une feuille de frais par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de frais"),
    }),
  })
  async getExpensesReport({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ExpensesReportAttributes>>(
        `/expenses-reports/${id}`,
      );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_expenses_report_default",
    description: "Récupère le template par défaut pour créer une nouvelle feuille de frais.",
    parameters: z.object({}),
  })
  async getExpensesReportDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<ExpensesReportAttributes>>(
        "/expenses-reports/default",
      );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_expenses_report_rights",
    description: "Récupère les permissions de l'utilisateur sur une feuille de frais.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de frais"),
    }),
  })
  async getExpensesReportRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/expenses-reports/${id}/rights`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Write tools ────────────────────────────────────────

  @Tool({
    name: "create_expenses_report",
    description:
      "Crée une nouvelle feuille de frais pour un collaborateur. " +
      "Nécessite le resource ID et au minimum une période.",
    parameters: z.object({
      resourceId: z.string().describe("ID du collaborateur (resource.data.id)"),
      informationComments: z.string().optional().describe("Commentaire libre"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createExpensesReport({
    resourceId,
    informationComments,
  }: {
    resourceId: string;
    informationComments?: string;
  }) {
    try {
      const body = {
        data: {
          type: "expensesreport",
          attributes: {
            ...(informationComments && { informationComments }),
          },
          relationships: {
            resource: {
              data: { id: resourceId, type: "resource" },
            },
          },
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(
        EXPENSES_REPORTS_CONFIG.path,
        body,
      );
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created expenses report with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_expenses_report",
    description: "Met à jour une feuille de frais existante.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de frais"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateExpensesReport({
    id,
    informationComments,
  }: {
    id: number;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, EXPENSES_REPORTS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_expenses_report",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une feuille de frais. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de frais à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteExpensesReport({ id }: { id: number }) {
    return executeDeleteTool(this.boond, EXPENSES_REPORTS_CONFIG, id);
  }

  // ─── Workflow action tools ──────────────────────────────

  @Tool({
    name: "validate_expenses_report",
    description: "Valide (approuve) une feuille de frais.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de frais à valider"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async validateExpensesReport({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/expenses-reports/${id}/validate`,
      `Expenses report ${id} validated`,
    );
  }

  @Tool({
    name: "unvalidate_expenses_report",
    description: "Annule la validation d'une feuille de frais.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de frais"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async unvalidateExpensesReport({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/expenses-reports/${id}/unvalidate`,
      `Expenses report ${id} unvalidated`,
    );
  }

  @Tool({
    name: "reject_expenses_report",
    description: "⚠️ Rejette une feuille de frais avec un motif.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de frais"),
      reason: z.string().optional().describe("Motif du rejet"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async rejectExpensesReport({ id, reason }: { id: number; reason?: string }) {
    const body = reason ? { data: { attributes: { reason } } } : undefined;
    return executeActionTool(
      this.boond,
      `/expenses-reports/${id}/reject`,
      `Expenses report ${id} rejected`,
      body,
    );
  }

  @Tool({
    name: "pay_expenses_report",
    description: "Marque une feuille de frais comme payée.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de frais"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async payExpensesReport({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/expenses-reports/${id}/pay`,
      `Expenses report ${id} marked as paid`,
    );
  }

  @Tool({
    name: "certify_expenses_report",
    description:
      "Certifie une feuille de frais (pour compliance comptable). " +
      "Crée une attestation officielle sur l'état de la feuille.",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de frais"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async certifyExpensesReport({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/expenses-reports/${id}/certification`,
      `Expenses report ${id} certified`,
    );
  }

  // ─── Download tool ──────────────────────────────────────

  @Tool({
    name: "download_expenses_report",
    description: "Télécharge la feuille de frais au format fichier (PDF).",
    parameters: z.object({
      id: z.number().describe("ID de la feuille de frais"),
    }),
  })
  async downloadExpensesReport({ id }: { id: number }) {
    try {
      const data = await this.boond.get<unknown>(`/expenses-reports/${id}/download`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Downloaded expenses report ${id}`,
            data,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
