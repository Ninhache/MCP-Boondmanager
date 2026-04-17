import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ResourceAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeActionTool,
  executeCreateTool,
  executeDeleteTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const RESOURCES_CONFIG = {
  path: "/resources",
  resourceType: "resource",
} as const;

@Injectable()
export class ResourcesTools {
  constructor(private readonly boond: BoondClient) {}

  // ─── List & detail ──────────────────────────────────────

  @Tool({
    name: "list_resources",
    description:
      "Récupère la liste paginée des collaborateurs (resources) de BoondManager. " +
      "Exemples de questions : « liste mes collaborateurs », « qui travaille chez nous ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés (nom, prénom, email)"),
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listResources({
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

    return executeListTool<ResourceAttributes>(
      this.boond,
      {
        path: "/resources",
        attributeKeys: ["firstName", "lastName", "email1", "title", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_resource",
    description:
      "Récupère les informations détaillées d'un collaborateur par son ID. " +
      "Exemples : « détails du collaborateur 42 », « infos sur le consultant X »",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur dans Boond"),
    }),
  })
  async getResource({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ResourceAttributes>>(
        `/resources/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_default",
    description: "Récupère le template par défaut pour créer un nouveau collaborateur.",
    parameters: z.object({}),
  })
  async getResourceDefault() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<ResourceAttributes>>("/resources/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_rights",
    description: "Récupère les permissions de l'utilisateur courant sur un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Sub-resources (read) ───────────────────────────────

  @Tool({
    name: "get_resource_information",
    description:
      "Récupère les informations personnelles d'un collaborateur (nom, email, titre, etc.).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceInformation({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/information`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_administrative",
    description:
      "Récupère les informations administratives d'un collaborateur (contrat, sécurité sociale, RIB, etc.).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceAdministrative({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/administrative`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_absences_accounts",
    description: "Récupère les compteurs de congés d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceAbsencesAccounts({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/absences-accounts`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_absences_reports",
    description: "Récupère les rapports d'absences d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceAbsencesReports({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/absences-reports`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_actions",
    description: "Récupère la liste des actions commerciales liées à un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceActions({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/actions`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_advantages",
    description: "Récupère les avantages (tickets resto, mutuelle, etc.) d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceAdvantages({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/advantages`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_ai_matching",
    description:
      "Récupère les suggestions IA de matching entre un collaborateur et des opportunités/positionnements.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceAiMatching({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/ai/matching`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_ai_summary",
    description: "Récupère le résumé IA d'un collaborateur (compétences, expérience, synthèse).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceAiSummary({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/ai/summary`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_attached_flags",
    description: "Récupère les flags/tags attachés à un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceAttachedFlags({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/attached-flags`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_deliveries_inactivities",
    description: "Récupère les livraisons et périodes d'inactivité d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceDeliveriesInactivities({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(
        `/resources/${id}/deliveries-inactivities`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_download",
    description:
      "Récupère le lien de téléchargement du CV ou dossier du collaborateur (retourne une URL signée).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceDownload({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/download`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_expenses_reports",
    description: "Récupère les notes de frais d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceExpensesReports({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/expenses-reports`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_followed_documents",
    description: "Récupère les documents suivis rattachés à un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceFollowedDocuments({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/followed-documents`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_forms",
    description: "Récupère les formulaires (RH, compétences, etc.) remplis par un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceForms({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/forms`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_positionings",
    description:
      "Récupère les positionnements commerciaux d'un collaborateur sur des opportunités.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourcePositionings({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/positionings`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_projects",
    description: "Récupère les projets sur lesquels un collaborateur est affecté.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceProjects({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/projects`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_provider_invoices",
    description:
      "Récupère les factures fournisseurs (sous-traitance) liées à un collaborateur externe.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceProviderInvoices({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/provider-invoices`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_tasks",
    description: "Récupère la liste des tâches (to-do) liées à un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceTasks({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/tasks`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_technical_data",
    description:
      "Récupère les données techniques principales d'un collaborateur (compétences, etc.).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceTechnicalData({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/technical-data`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_technical_datas",
    description:
      "Récupère les données techniques étendues d'un collaborateur (historique de compétences).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceTechnicalDatas({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/technical-datas`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_times_reports",
    description: "Récupère les rapports d'activité (CRA) d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceTimesReports({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/times-reports`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Settings (read) ────────────────────────────────────

  @Tool({
    name: "get_resource_settings_absences_accounts",
    description: "Récupère la configuration des compteurs de congés d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceSettingsAbsencesAccounts({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(
        `/resources/${id}/settings/absences-accounts`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_settings_alerts",
    description: "Récupère la configuration des alertes d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceSettingsAlerts({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/settings/alerts`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_settings_dashboards",
    description: "Récupère la configuration des dashboards personnalisés d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceSettingsDashboards({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(
        `/resources/${id}/settings/dashboards`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_settings_groups",
    description: "Récupère la configuration des groupes d'appartenance d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceSettingsGroups({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/settings/groups`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_settings_intranet",
    description: "Récupère la configuration intranet (accès portail) d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceSettingsIntranet({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/settings/intranet`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_settings_notifications",
    description: "Récupère la configuration des notifications d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceSettingsNotifications({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(
        `/resources/${id}/settings/notifications`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_settings_positioning_suggests",
    description:
      "Récupère la configuration des suggestions de positionnement IA d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceSettingsPositioningSuggests({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(
        `/resources/${id}/settings/positioning-suggests`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_settings_reporting",
    description: "Récupère la configuration reporting d'un collaborateur (dashboards, KPIs).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceSettingsReporting({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/settings/reporting`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_settings_security",
    description: "Récupère la configuration de sécurité (permissions, rôles) d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceSettingsSecurity({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/settings/security`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_resource_settings_targets",
    description: "Récupère les objectifs commerciaux (targets) d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
  })
  async getResourceSettingsTargets({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/resources/${id}/settings/targets`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Write tools ────────────────────────────────────────

  @Tool({
    name: "create_resource",
    description:
      "Crée un nouveau collaborateur. Utiliser get_resource_default au préalable pour connaître les champs attendus.",
    parameters: z.object({
      firstName: z.string().describe("Prénom"),
      lastName: z.string().describe("Nom"),
      email1: z.string().optional().describe("Email principal"),
      title: z.string().optional().describe("Titre / poste"),
      typeOf: z.number().optional().describe("Type de ressource (ref. Boond)"),
      state: z.number().optional().describe("Statut (ref. Boond)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createResource(attrs: {
    firstName: string;
    lastName: string;
    email1?: string;
    title?: string;
    typeOf?: number;
    state?: number;
  }) {
    const attributes: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (v !== undefined) attributes[k] = v;
    }
    return executeCreateTool(this.boond, RESOURCES_CONFIG, attributes);
  }

  @Tool({
    name: "update_resource_information",
    description:
      "Met à jour les informations personnelles d'un collaborateur (nom, email, téléphone, etc.).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z
        .record(z.string(), z.unknown())
        .describe("Attributs à mettre à jour sur les informations"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceInformation({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/information`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} information updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_resource_administrative",
    description:
      "Met à jour les informations administratives d'un collaborateur (contrat, sécu, RIB).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z.record(z.string(), z.unknown()).describe("Attributs administratifs à modifier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceAdministrative({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/administrative`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} administrative updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_resource_technical_data",
    description: "Met à jour les données techniques (compétences, expertises) d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z.record(z.string(), z.unknown()).describe("Données techniques à modifier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceTechnicalData({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/technical-data`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} technical data updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_resource_settings_absences_accounts",
    description: "Met à jour la configuration des compteurs de congés d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z.record(z.string(), z.unknown()).describe("Paramètres à modifier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceSettingsAbsencesAccounts({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/settings/absences-accounts`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} absences-accounts settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_resource_settings_alerts",
    description: "Met à jour la configuration des alertes d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z.record(z.string(), z.unknown()).describe("Paramètres d'alertes à modifier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceSettingsAlerts({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/settings/alerts`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} alerts settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_resource_settings_groups",
    description: "Met à jour les groupes d'appartenance d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z.record(z.string(), z.unknown()).describe("Groupes à modifier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceSettingsGroups({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/settings/groups`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} groups settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_resource_settings_intranet",
    description: "Met à jour la configuration intranet (accès portail) d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z.record(z.string(), z.unknown()).describe("Paramètres intranet à modifier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceSettingsIntranet({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/settings/intranet`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} intranet settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_resource_settings_notifications",
    description: "Met à jour la configuration des notifications d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z.record(z.string(), z.unknown()).describe("Paramètres de notif à modifier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceSettingsNotifications({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/settings/notifications`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} notifications settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_resource_settings_positioning_suggests",
    description:
      "Met à jour la configuration des suggestions de positionnement IA d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z.record(z.string(), z.unknown()).describe("Paramètres à modifier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceSettingsPositioningSuggests({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/settings/positioning-suggests`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} positioning-suggests settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_resource_settings_reporting",
    description: "Met à jour la configuration reporting d'un collaborateur (dashboards, KPIs).",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z.record(z.string(), z.unknown()).describe("Paramètres reporting à modifier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceSettingsReporting({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/settings/reporting`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} reporting settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_resource_settings_security",
    description: "Met à jour la configuration de sécurité (permissions, rôles) d'un collaborateur.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
      attributes: z.record(z.string(), z.unknown()).describe("Paramètres sécurité à modifier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateResourceSettingsSecurity({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "resource", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/resources/${id}/settings/security`,
        body,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resource ${id} security settings updated`,
            resource: formatDetail(response),
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Action tools ───────────────────────────────────────

  @Tool({
    name: "reset_resource_settings_alerts",
    description: "Réinitialise les alertes d'un collaborateur à leur configuration par défaut.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async resetResourceSettingsAlerts({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/resources/${id}/settings/alerts/reset`,
      `Resource ${id} alerts reset`,
    );
  }

  // ─── Destructive ────────────────────────────────────────

  @Tool({
    name: "delete_resource",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un collaborateur. Opération irréversible. " +
      "Les données liées (CRA, notes de frais, positionnements) peuvent être impactées.",
    parameters: z.object({
      id: z.number().describe("ID du collaborateur à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteResource({ id }: { id: number }) {
    return executeDeleteTool(this.boond, RESOURCES_CONFIG, id);
  }
}
