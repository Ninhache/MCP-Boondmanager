import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, FormAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import {
  executeActionTool,
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const FORMS_CONFIG = {
  path: "/forms",
  resourceType: "form",
} as const;

const FORM_TEMPLATES_CONFIG = {
  path: "/forms/templates",
  resourceType: "formtemplate",
} as const;

@Injectable()
export class FormsTools {
  constructor(private readonly boond: BoondClient) {}

  // ─── Form read tools ────────────────────────────────────

  @Tool({
    name: "get_form",
    description: "Récupère les détails d'un formulaire par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du formulaire"),
    }),
  })
  async getForm({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<FormAttributes>>(`/forms/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_form_default",
    description: "Récupère le template par défaut pour créer un nouveau formulaire.",
    parameters: z.object({}),
  })
  async getFormDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<FormAttributes>>("/forms/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_form_rights",
    description: "Récupère les permissions de l'utilisateur sur un formulaire.",
    parameters: z.object({
      id: z.number().describe("ID du formulaire"),
    }),
  })
  async getFormRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/forms/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_form_tasks",
    description: "Récupère les tâches associées à un formulaire.",
    parameters: z.object({
      id: z.number().describe("ID du formulaire"),
    }),
  })
  async getFormTasks({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/forms/${id}/tasks`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Form write tools ───────────────────────────────────

  @Tool({
    name: "create_form",
    description:
      "Crée un nouveau formulaire. Nécessite généralement le resource ou template de référence.",
    parameters: z.object({
      title: z.string().optional().describe("Titre du formulaire"),
      templateId: z.string().optional().describe("ID du template à utiliser"),
      informationComments: z.string().optional().describe("Commentaire libre"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createForm({
    title,
    templateId,
    informationComments,
  }: {
    title?: string;
    templateId?: string;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (title !== undefined) attributes.title = title;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    if (templateId) {
      try {
        const body = {
          data: {
            type: "form",
            attributes,
            relationships: {
              template: { data: { id: templateId, type: "formtemplate" } },
            },
          },
        };
        const response = await this.boond.post<BoondDetailResponse>(FORMS_CONFIG.path, body);
        const formatted = formatDetail(response);
        const id = response?.data?.id ?? "unknown";
        return {
          content: [
            toTextContent({
              success: true,
              message: `✓ Created form with ID ${id}`,
              resource: formatted,
            }),
          ],
        };
      } catch (error) {
        return handleBoondError(error);
      }
    }
    return executeCreateTool(this.boond, FORMS_CONFIG, attributes);
  }

  @Tool({
    name: "update_form",
    description: "Met à jour un formulaire existant.",
    parameters: z.object({
      id: z.number().describe("ID du formulaire"),
      title: z.string().optional().describe("Nouveau titre"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateForm({
    id,
    title,
    informationComments,
  }: {
    id: number;
    title?: string;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (title !== undefined) attributes.title = title;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, FORMS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_form",
    description: "⚠️ DESTRUCTIF — Supprime définitivement un formulaire. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du formulaire à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteForm({ id }: { id: number }) {
    return executeDeleteTool(this.boond, FORMS_CONFIG, id);
  }

  // ─── Form action tools ──────────────────────────────────

  @Tool({
    name: "remind_form",
    description:
      "Envoie un rappel au destinataire d'un formulaire non complété (email de relance).",
    parameters: z.object({
      id: z.number().describe("ID du formulaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async remindForm({ id }: { id: number }) {
    return executeActionTool(this.boond, `/forms/${id}/remind`, `Form ${id} reminder sent`);
  }

  // ─── Form templates tools ───────────────────────────────

  @Tool({
    name: "list_form_templates",
    description:
      "Récupère la liste des templates de formulaires disponibles. " +
      "Exemples : « liste les templates de formulaires »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
    }),
  })
  async listFormTemplates({ page, pageSize }: { page?: number; pageSize?: number }) {
    try {
      const params = new URLSearchParams();
      if (page !== undefined) params.set("page", String(page));
      if (pageSize !== undefined) params.set("maxResults", String(pageSize));
      const query = params.toString();
      const data = await this.boond.get<BoondDetailResponse>(
        `/forms/templates${query ? `?${query}` : ""}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_form_template",
    description: "Récupère les détails d'un template de formulaire par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du template"),
    }),
  })
  async getFormTemplate({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/forms/templates/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_form_template_default",
    description: "Récupère le template par défaut pour créer un nouveau form template.",
    parameters: z.object({}),
  })
  async getFormTemplateDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse>("/forms/templates/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_form_template",
    description: "Crée un nouveau template de formulaire réutilisable.",
    parameters: z.object({
      title: z.string().describe("Titre du template"),
      description: z.string().optional().describe("Description"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createFormTemplate({ title, description }: { title: string; description?: string }) {
    const attributes: Record<string, unknown> = { title };
    if (description !== undefined) attributes.description = description;
    return executeCreateTool(this.boond, FORM_TEMPLATES_CONFIG, attributes);
  }

  @Tool({
    name: "update_form_template",
    description: "Met à jour un template de formulaire existant.",
    parameters: z.object({
      id: z.number().describe("ID du template"),
      title: z.string().optional().describe("Nouveau titre"),
      description: z.string().optional().describe("Nouvelle description"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateFormTemplate({
    id,
    title,
    description,
  }: {
    id: number;
    title?: string;
    description?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (title !== undefined) attributes.title = title;
    if (description !== undefined) attributes.description = description;
    return executeUpdateTool(this.boond, FORM_TEMPLATES_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_form_template",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un template de formulaire. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du template à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteFormTemplate({ id }: { id: number }) {
    return executeDeleteTool(this.boond, FORM_TEMPLATES_CONFIG, id);
  }
}
