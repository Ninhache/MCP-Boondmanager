import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, MarketplaceAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeActionTool,
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const MARKETPLACE_CONFIG = {
  path: "/marketplace",
  resourceType: "marketplaceitem",
} as const;

@Injectable()
export class MarketplaceTools {
  constructor(private readonly boond: BoondClient) {}

  // ─── Read tools ─────────────────────────────────────────

  @Tool({
    name: "list_marketplace",
    description:
      "Récupère la liste paginée des apps de la marketplace Boond. " +
      "Exemples : « liste les apps disponibles », « quelles apps installées ? »",
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
  async listMarketplace({
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

    return executeListTool<MarketplaceAttributes>(
      this.boond,
      {
        path: MARKETPLACE_CONFIG.path,
        attributeKeys: ["name", "appCode", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_marketplace",
    description: "Récupère les détails d'une app marketplace par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de l'app marketplace"),
    }),
  })
  async getMarketplace({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<MarketplaceAttributes>>(
        `/marketplace/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_marketplace_default",
    description: "Récupère le template par défaut pour créer une nouvelle app marketplace.",
    parameters: z.object({}),
  })
  async getMarketplaceDefault() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<MarketplaceAttributes>>("/marketplace/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_marketplace_rights",
    description: "Récupère les permissions de l'utilisateur sur une app marketplace.",
    parameters: z.object({
      id: z.number().describe("ID de l'app"),
    }),
  })
  async getMarketplaceRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/marketplace/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_marketplace_translations",
    description: "Récupère les traductions (i18n) d'une app marketplace.",
    parameters: z.object({
      id: z.number().describe("ID de l'app"),
    }),
  })
  async getMarketplaceTranslations({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/marketplace/${id}/translations`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_marketplace_configure",
    description: "Récupère la configuration d'une app marketplace installée (par appCode).",
    parameters: z.object({
      appCode: z.string().describe("Code de l'app (ex: 'extractbi', 'emailing')"),
    }),
  })
  async getMarketplaceConfigure({ appCode }: { appCode: string }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/marketplace/${appCode}/configure`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Write tools ────────────────────────────────────────

  @Tool({
    name: "create_marketplace",
    description: "Crée une nouvelle app dans la marketplace (pour les développeurs d'apps).",
    parameters: z.object({
      name: z.string().describe("Nom de l'app"),
      appCode: z.string().optional().describe("Code unique de l'app"),
      description: z.string().optional().describe("Description"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createMarketplace({
    name,
    appCode,
    description,
  }: {
    name: string;
    appCode?: string;
    description?: string;
  }) {
    const attributes: Record<string, unknown> = { name };
    if (appCode !== undefined) attributes.appCode = appCode;
    if (description !== undefined) attributes.description = description;
    return executeCreateTool(this.boond, MARKETPLACE_CONFIG, attributes);
  }

  @Tool({
    name: "update_marketplace",
    description: "Met à jour une app marketplace existante.",
    parameters: z.object({
      id: z.number().describe("ID de l'app"),
      name: z.string().optional().describe("Nouveau nom"),
      description: z.string().optional().describe("Nouvelle description"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateMarketplace({
    id,
    name,
    description,
  }: {
    id: number;
    name?: string;
    description?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (name !== undefined) attributes.name = name;
    if (description !== undefined) attributes.description = description;
    return executeUpdateTool(this.boond, MARKETPLACE_CONFIG, id, attributes);
  }

  @Tool({
    name: "update_marketplace_translations",
    description:
      "Met à jour les traductions (i18n) d'une app marketplace. " +
      "Utiliser get_marketplace_translations au préalable pour connaître la structure.",
    parameters: z.object({
      id: z.number().describe("ID de l'app"),
      translations: z
        .record(z.string(), z.unknown())
        .describe("Objet de traductions complet (attributes à remplacer)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateMarketplaceTranslations({
    id,
    translations,
  }: {
    id: number;
    translations: Record<string, unknown>;
  }) {
    try {
      const body = {
        data: {
          type: "marketplaceitem",
          attributes: translations,
        },
      };
      const response = await this.boond.put<BoondDetailResponse>(
        `/marketplace/${id}/translations`,
        body,
      );
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Updated translations for marketplace app ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_marketplace_configure",
    description:
      "Met à jour la configuration d'une app marketplace installée (par appCode). " +
      "Utiliser get_marketplace_configure au préalable pour connaître les champs.",
    parameters: z.object({
      appCode: z.string().describe("Code de l'app"),
      configuration: z
        .record(z.string(), z.unknown())
        .describe("Objet de configuration (attributes à appliquer)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateMarketplaceConfigure({
    appCode,
    configuration,
  }: {
    appCode: string;
    configuration: Record<string, unknown>;
  }) {
    try {
      const body = {
        data: {
          type: "marketplaceitem",
          attributes: configuration,
        },
      };
      const response = await this.boond.put<BoondDetailResponse>(
        `/marketplace/${appCode}/configure`,
        body,
      );
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Updated configuration for app ${appCode}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_marketplace",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une app de la marketplace. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de l'app à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteMarketplace({ id }: { id: number }) {
    return executeDeleteTool(this.boond, MARKETPLACE_CONFIG, id);
  }

  // ─── Workflow action tools ──────────────────────────────

  @Tool({
    name: "install_marketplace",
    description: "Installe une app de la marketplace dans le compte Boond courant.",
    parameters: z.object({
      id: z.number().describe("ID de l'app à installer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async installMarketplace({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/marketplace/${id}/install`,
      `Marketplace app ${id} installed`,
    );
  }

  @Tool({
    name: "validate_marketplace",
    description: "Valide une app de la marketplace (pour les développeurs).",
    parameters: z.object({
      id: z.number().describe("ID de l'app"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async validateMarketplace({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/marketplace/${id}/validate`,
      `Marketplace app ${id} validated`,
    );
  }

  @Tool({
    name: "publish_marketplace",
    description: "Publie une app marketplace (rend visible publiquement).",
    parameters: z.object({
      id: z.number().describe("ID de l'app à publier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async publishMarketplace({ id }: { id: number }) {
    return executeActionTool(
      this.boond,
      `/marketplace/${id}/publish`,
      `Marketplace app ${id} published`,
    );
  }

  @Tool({
    name: "uninstall_marketplace",
    description:
      "⚠️ Désinstalle une app de la marketplace du compte Boond courant. " +
      "Les données de configuration peuvent être perdues.",
    parameters: z.object({
      id: z.number().describe("ID de l'app à désinstaller"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async uninstallMarketplace({ id }: { id: number }) {
    try {
      await this.boond.delete(`/marketplace/${id}/uninstall`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Marketplace app ${id} uninstalled`,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "refresh_marketplace_token",
    description: "Rafraîchit le token OAuth d'une app marketplace installée.",
    parameters: z.object({}),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async refreshMarketplaceToken() {
    return executeActionTool(
      this.boond,
      "/marketplace/refresh-token",
      "Marketplace token refreshed",
    );
  }
}
