import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, StandardProfileAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const STANDARD_PROFILES_CONFIG = {
  path: "/standard-profiles",
  resourceType: "standardprofile",
} as const;

@Injectable()
export class StandardProfilesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_standard_profiles",
    description:
      "Récupère la liste des profils types (templates de candidats/resources). " +
      "Exemples : « liste les profils types », « quels templates disponibles ? »",
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
  async listStandardProfiles({
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

    return executeListTool<StandardProfileAttributes>(
      this.boond,
      {
        path: STANDARD_PROFILES_CONFIG.path,
        attributeKeys: ["name"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_standard_profile",
    description: "Récupère les détails d'un profil type par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du profil type"),
    }),
  })
  async getStandardProfile({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<StandardProfileAttributes>>(
        `/standard-profiles/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_standard_profile_default",
    description: "Récupère le template par défaut pour créer un nouveau profil type.",
    parameters: z.object({}),
  })
  async getStandardProfileDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<StandardProfileAttributes>>(
        "/standard-profiles/default",
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_standard_profile_rights",
    description: "Récupère les permissions de l'utilisateur sur un profil type.",
    parameters: z.object({
      id: z.number().describe("ID du profil type"),
    }),
  })
  async getStandardProfileRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/standard-profiles/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_standard_profile",
    description: "Crée un nouveau profil type (template réutilisable).",
    parameters: z.object({
      name: z.string().describe("Nom du profil type"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createStandardProfile({ name }: { name: string }) {
    return executeCreateTool(this.boond, STANDARD_PROFILES_CONFIG, { name });
  }

  @Tool({
    name: "update_standard_profile",
    description: "Met à jour un profil type existant.",
    parameters: z.object({
      id: z.number().describe("ID du profil type"),
      name: z.string().optional().describe("Nouveau nom"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateStandardProfile({ id, name }: { id: number; name?: string }) {
    const attributes: Record<string, unknown> = {};
    if (name !== undefined) attributes.name = name;
    return executeUpdateTool(this.boond, STANDARD_PROFILES_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_standard_profile",
    description: "⚠️ DESTRUCTIF — Supprime définitivement un profil type. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du profil type à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteStandardProfile({ id }: { id: number }) {
    return executeDeleteTool(this.boond, STANDARD_PROFILES_CONFIG, id);
  }
}
