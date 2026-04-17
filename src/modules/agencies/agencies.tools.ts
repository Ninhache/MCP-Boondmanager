import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { AgencyAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { executeCreateTool, executeDeleteTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const AGENCIES_CONFIG = {
  path: "/agencies",
  resourceType: "agency",
} as const;

// Sub-resource PUT bodies intentionally omit `data.id` — matches the pattern
// used in companies/resources modules against live Boond instances. Consolidation
// of this pattern into a shared helper is tracked in #142.
const UPDATE_ANNOTATIONS = {
  readOnlyHint: false,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true,
} as const;

const DELETE_ANNOTATIONS = {
  readOnlyHint: false,
  destructiveHint: true,
  idempotentHint: true,
  openWorldHint: true,
} as const;

// Logo removal is a settings reset (recoverable via re-upload), not destruction
// of business data. Annotate as non-destructive to avoid over-cautious client prompts.
const LOGO_DELETE_ANNOTATIONS = {
  readOnlyHint: false,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true,
} as const;

@Injectable()
export class AgenciesTools {
  constructor(private readonly boond: BoondClient) {}

  // ─── List & detail ──────────────────────────────────────

  @Tool({
    name: "list_agencies",
    description:
      "Récupère la liste paginée des agences de BoondManager. " +
      "Exemples de questions : « liste les agences », « quelles sont nos agences ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés (nom, ville)"),
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listAgencies({
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

    return executeListTool<AgencyAttributes>(
      this.boond,
      {
        path: "/agencies",
        attributeKeys: ["name", "town", "country", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_agency",
    description:
      "Récupère les informations détaillées d'une agence par son ID. " +
      "Exemples : « détails de l'agence 5 », « informations sur l'agence Paris »",
    parameters: z.object({
      id: z.number().describe("ID de l'agence dans Boond"),
    }),
  })
  async getAgency({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<AgencyAttributes>>(`/agencies/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_agency_default",
    description: "Récupère le template par défaut pour créer une nouvelle agence.",
    parameters: z.object({}),
  })
  async getAgencyDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<AgencyAttributes>>("/agencies/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_agency_rights",
    description: "Récupère les permissions de l'utilisateur courant sur une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
  })
  async getAgencyRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/agencies/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Sub-resources (read) ───────────────────────────────

  @Tool({
    name: "get_agency_information",
    description: "Récupère les informations générales d'une agence (adresse, contacts, etc.).",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
  })
  async getAgencyInformation({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/agencies/${id}/information`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_agency_activity_expenses",
    description:
      "Récupère la configuration des notes de frais d'activité pour une agence (types, limites, règles).",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
  })
  async getAgencyActivityExpenses({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/agencies/${id}/activity-expenses`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_agency_billing",
    description:
      "Récupère la configuration de facturation d'une agence (RIB, TVA, mentions, etc.).",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
  })
  async getAgencyBilling({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/agencies/${id}/billing`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_agency_opportunities",
    description: "Récupère la configuration par défaut des opportunités pour une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
  })
  async getAgencyOpportunities({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/agencies/${id}/opportunities`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_agency_products",
    description: "Récupère la configuration par défaut des produits pour une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
  })
  async getAgencyProducts({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/agencies/${id}/products`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_agency_projects",
    description: "Récupère la configuration par défaut des projets pour une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
  })
  async getAgencyProjects({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/agencies/${id}/projects`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_agency_purchases",
    description: "Récupère la configuration par défaut des achats pour une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
  })
  async getAgencyPurchases({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/agencies/${id}/purchases`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_agency_resources",
    description: "Récupère la configuration par défaut des ressources pour une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
  })
  async getAgencyResources({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/agencies/${id}/resources`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_agency_technical_data",
    description: "Récupère les données techniques (compétences, expertises) d'une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
  })
  async getAgencyTechnicalData({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/agencies/${id}/technical-data`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Write tools ────────────────────────────────────────

  @Tool({
    name: "create_agency",
    description:
      "Crée une nouvelle agence. Utiliser get_agency_default au préalable pour connaître les champs attendus.",
    parameters: z.object({
      name: z.string().describe("Nom de l'agence"),
      town: z.string().optional().describe("Ville"),
      country: z.string().optional().describe("Pays"),
      phone1: z.string().optional().describe("Téléphone principal"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createAgency(attrs: { name: string; town?: string; country?: string; phone1?: string }) {
    const attributes: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (v !== undefined) attributes[k] = v;
    }
    return executeCreateTool(this.boond, AGENCIES_CONFIG, attributes);
  }

  @Tool({
    name: "update_agency_information",
    description: "Met à jour les informations générales d'une agence (adresse, contacts, etc.).",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z.record(z.string(), z.unknown()).describe("Attributs à mettre à jour"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyInformation({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/agencies/${id}/information`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} information updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_agency_activity_expenses",
    description: "Met à jour la configuration des notes de frais d'activité d'une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z.record(z.string(), z.unknown()).describe("Attributs à mettre à jour"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyActivityExpenses({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/agencies/${id}/activity-expenses`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} activity-expenses updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_agency_activity_expenses_logo",
    description:
      "Met à jour le logo utilisé sur les notes de frais d'une agence. Le body contient l'image encodée.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z
        .record(z.string(), z.unknown())
        .describe("Données du logo (base64 ou référence de fichier)"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyActivityExpensesLogo({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/agencies/${id}/activity-expenses/logo`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} activity-expenses logo updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_agency_billing",
    description: "Met à jour la configuration de facturation d'une agence (RIB, TVA, mentions).",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z.record(z.string(), z.unknown()).describe("Attributs à mettre à jour"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyBilling({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(`/agencies/${id}/billing`, body);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} billing updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_agency_billing_logo",
    description:
      "Met à jour le logo utilisé sur les factures d'une agence. Le body contient l'image encodée.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z
        .record(z.string(), z.unknown())
        .describe("Données du logo (base64 ou référence de fichier)"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyBillingLogo({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/agencies/${id}/billing/logo`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} billing logo updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_agency_opportunities",
    description: "Met à jour la configuration par défaut des opportunités d'une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z.record(z.string(), z.unknown()).describe("Attributs à mettre à jour"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyOpportunities({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/agencies/${id}/opportunities`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} opportunities settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_agency_products",
    description: "Met à jour la configuration par défaut des produits d'une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z.record(z.string(), z.unknown()).describe("Attributs à mettre à jour"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyProducts({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(`/agencies/${id}/products`, body);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} products settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_agency_projects",
    description: "Met à jour la configuration par défaut des projets d'une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z.record(z.string(), z.unknown()).describe("Attributs à mettre à jour"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyProjects({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(`/agencies/${id}/projects`, body);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} projects settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_agency_purchases",
    description: "Met à jour la configuration par défaut des achats d'une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z.record(z.string(), z.unknown()).describe("Attributs à mettre à jour"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyPurchases({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(`/agencies/${id}/purchases`, body);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} purchases settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_agency_resources",
    description: "Met à jour la configuration par défaut des ressources d'une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z.record(z.string(), z.unknown()).describe("Attributs à mettre à jour"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyResources({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(`/agencies/${id}/resources`, body);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} resources settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_agency_technical_data",
    description: "Met à jour les données techniques (compétences, expertises) d'une agence.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
      attributes: z.record(z.string(), z.unknown()).describe("Attributs à mettre à jour"),
    }),
    annotations: UPDATE_ANNOTATIONS,
  })
  async updateAgencyTechnicalData({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "agency", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/agencies/${id}/technical-data`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} technical data updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Destructive tools ──────────────────────────────────

  @Tool({
    name: "delete_agency_activity_expenses_logo",
    description:
      "Supprime le logo configuré sur les notes de frais d'activité d'une agence. " +
      "Récupérable en réuploadant un nouveau logo.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
    annotations: LOGO_DELETE_ANNOTATIONS,
  })
  async deleteAgencyActivityExpensesLogo({ id }: { id: number }) {
    try {
      await this.boond.delete(`/agencies/${id}/activity-expenses/logo`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} activity-expenses logo deleted`,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_agency_billing_logo",
    description:
      "Supprime le logo configuré sur les factures d'une agence. " +
      "Récupérable en réuploadant un nouveau logo.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence"),
    }),
    annotations: LOGO_DELETE_ANNOTATIONS,
  })
  async deleteAgencyBillingLogo({ id }: { id: number }) {
    try {
      await this.boond.delete(`/agencies/${id}/billing/logo`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Agency ${id} billing logo deleted`,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_agency",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une agence. Opération irréversible. " +
      "Toutes les données rattachées (projets, ressources, factures) peuvent être impactées.",
    parameters: z.object({
      id: z.number().describe("ID de l'agence à supprimer"),
    }),
    annotations: DELETE_ANNOTATIONS,
  })
  async deleteAgency({ id }: { id: number }) {
    return executeDeleteTool(this.boond, AGENCIES_CONFIG, id);
  }
}
