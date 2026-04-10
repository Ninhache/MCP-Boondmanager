import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, TaskAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeActionTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class TasksTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_task",
    description: "Récupère les détails d'une tâche individuelle par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la tâche"),
    }),
  })
  async getTask({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<TaskAttributes>>(`/tasks/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "check_task",
    description: "Marque une tâche comme complétée (cochée).",
    parameters: z.object({
      id: z.number().describe("ID de la tâche"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async checkTask({ id }: { id: number }) {
    return executeActionTool(this.boond, `/tasks/${id}/check`, `Task ${id} checked`);
  }

  @Tool({
    name: "uncheck_task",
    description: "Annule la complétion d'une tâche (décoche).",
    parameters: z.object({
      id: z.number().describe("ID de la tâche"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async uncheckTask({ id }: { id: number }) {
    return executeActionTool(this.boond, `/tasks/${id}/uncheck`, `Task ${id} unchecked`);
  }
}
