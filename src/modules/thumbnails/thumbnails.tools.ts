import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ThumbnailAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeCreateTool, executeDeleteTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const THUMBNAILS_CONFIG = {
  path: "/thumbnails",
  resourceType: "thumbnail",
} as const;

@Injectable()
export class ThumbnailsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_thumbnail",
    description: "Récupère les détails d'une miniature d'image par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la miniature"),
    }),
  })
  async getThumbnail({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ThumbnailAttributes>>(
        `/thumbnails/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_thumbnail",
    description:
      "Crée une nouvelle miniature d'image (généralement liée à un document ou une ressource).",
    parameters: z.object({
      attributes: z
        .record(z.string(), z.unknown())
        .describe("Attributs de la miniature (URL source, dimensions, etc.)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createThumbnail({ attributes }: { attributes: Record<string, unknown> }) {
    return executeCreateTool(this.boond, THUMBNAILS_CONFIG, attributes);
  }

  @Tool({
    name: "delete_thumbnail",
    description: "⚠️ DESTRUCTIF — Supprime définitivement une miniature. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de la miniature à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteThumbnail({ id }: { id: number }) {
    return executeDeleteTool(this.boond, THUMBNAILS_CONFIG, id);
  }
}
