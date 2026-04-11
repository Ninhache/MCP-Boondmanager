import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, CompanyAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeActionTool,
  executeCreateTool,
  executeDeleteTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const COMPANIES_CONFIG = {
  path: "/companies",
  resourceType: "company",
} as const;

@Injectable()
export class CompaniesTools {
  constructor(private readonly boond: BoondClient) {}

  // ─── List & detail ──────────────────────────────────────

  @Tool({
    name: "list_companies",
    description:
      "Récupère la liste paginée des sociétés (companies) de BoondManager. " +
      "Exemples de questions : « liste les sociétés », « quels sont nos clients ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés (nom, ville, email)"),
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listCompanies({
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

    return executeListTool<CompanyAttributes>(
      this.boond,
      {
        path: "/companies",
        attributeKeys: ["name", "phone1", "town", "country", "state", "website"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_company",
    description:
      "Récupère les informations détaillées d'une société par son ID. " +
      "Exemples de questions : « détails de la société 42 », « informations sur le client X »",
    parameters: z.object({
      id: z.number().describe("ID de la société dans Boond"),
    }),
  })
  async getCompany({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<CompanyAttributes>>(`/companies/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_default",
    description: "Récupère le template par défaut pour créer une nouvelle société.",
    parameters: z.object({}),
  })
  async getCompanyDefault() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<CompanyAttributes>>("/companies/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_rights",
    description: "Récupère les permissions de l'utilisateur courant sur une société.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Sub-resources (read) ───────────────────────────────

  @Tool({
    name: "get_company_information",
    description:
      "Récupère les informations détaillées d'une société (adresse, contacts principaux, paramètres).",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyInformation({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/information`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_contacts",
    description: "Récupère la liste des contacts rattachés à une société.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyContacts({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/contacts`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_actions",
    description:
      "Récupère la liste des actions commerciales (actions, RDV, appels) liées à une société.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyActions({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/actions`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_opportunities",
    description: "Récupère la liste des opportunités commerciales liées à une société.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyOpportunities({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/opportunities`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_projects",
    description: "Récupère la liste des projets rattachés à une société (en tant que client).",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyProjects({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/projects`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_purchases",
    description: "Récupère la liste des achats (côté fournisseur) liés à une société.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyPurchases({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/purchases`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_provider_invoices",
    description: "Récupère la liste des factures fournisseurs liées à une société.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyProviderInvoices({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/provider-invoices`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_invoices",
    description: "Récupère la liste des factures clients liées à une société.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyInvoices({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/invoices`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_orders",
    description: "Récupère la liste des commandes liées à une société.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyOrders({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/orders`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_attached_flags",
    description: "Récupère les flags/tags attachés à une société.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyAttachedFlags({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/attached-flags`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_tasks",
    description: "Récupère la liste des tâches (to-do) liées à une société.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanyTasks({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/tasks`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_company_settings",
    description:
      "Récupère les paramètres spécifiques d'une société (taxes, délais de paiement, etc.).",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
    }),
  })
  async getCompanySettings({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/companies/${id}/settings`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Write tools ────────────────────────────────────────

  @Tool({
    name: "create_company",
    description:
      "Crée une nouvelle société. Utiliser get_company_default au préalable pour connaître les champs attendus.",
    parameters: z.object({
      name: z.string().describe("Nom de la société"),
      town: z.string().optional().describe("Ville"),
      country: z.string().optional().describe("Pays"),
      website: z.string().optional().describe("Site web"),
      phone1: z.string().optional().describe("Téléphone principal"),
      typeOf: z.number().optional().describe("Type de société (ref. Boond)"),
      informationComments: z.string().optional().describe("Commentaire libre"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createCompany({
    name,
    town,
    country,
    website,
    phone1,
    typeOf,
    informationComments,
  }: {
    name: string;
    town?: string;
    country?: string;
    website?: string;
    phone1?: string;
    typeOf?: number;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = { name };
    if (town !== undefined) attributes.town = town;
    if (country !== undefined) attributes.country = country;
    if (website !== undefined) attributes.website = website;
    if (phone1 !== undefined) attributes.phone1 = phone1;
    if (typeOf !== undefined) attributes.typeOf = typeOf;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeCreateTool(this.boond, COMPANIES_CONFIG, attributes);
  }

  @Tool({
    name: "update_company_information",
    description:
      "Met à jour les informations d'une société (adresse, contacts, téléphone, etc.). " +
      "Utiliser get_company_information au préalable pour connaître la structure.",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
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
  async updateCompanyInformation({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "company", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/companies/${id}/information`,
        body,
      );
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Company ${id} information updated`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_company_settings",
    description:
      "Met à jour les paramètres spécifiques d'une société (taxes, délais de paiement, etc.).",
    parameters: z.object({
      id: z.number().describe("ID de la société"),
      attributes: z.record(z.string(), z.unknown()).describe("Paramètres à mettre à jour"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateCompanySettings({
    id,
    attributes,
  }: {
    id: number;
    attributes: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "company", attributes } };
      const response = await this.boond.put<BoondDetailResponse>(`/companies/${id}/settings`, body);
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Company ${id} settings updated`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_company",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une société. Opération irréversible. " +
      "Toutes les données liées (contacts, opportunités, projets) peuvent être impactées.",
    parameters: z.object({
      id: z.number().describe("ID de la société à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteCompany({ id }: { id: number }) {
    return executeDeleteTool(this.boond, COMPANIES_CONFIG, id);
  }

  @Tool({
    name: "merge_company",
    description:
      "⚠️ Fusionne une société avec une ou plusieurs autres sociétés. " +
      "Les sociétés sources sont supprimées et toutes leurs données rattachées migrent vers la société cible.",
    parameters: z.object({
      id: z.number().describe("ID de la société cible (celle qui est conservée)"),
      sourceIds: z.array(z.number()).describe("IDs des sociétés sources à fusionner dans la cible"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async mergeCompany({ id, sourceIds }: { id: number; sourceIds: number[] }) {
    return executeActionTool(
      this.boond,
      `/companies/${id}/merge`,
      `Company ${id} merged with ${sourceIds.length} source(s)`,
      { data: { attributes: { sourceIds } } },
    );
  }
}
