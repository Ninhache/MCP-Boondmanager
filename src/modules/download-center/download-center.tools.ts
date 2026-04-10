import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, DownloadCenterAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class DownloadCenterTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_download_center",
    description:
      "Liste les fichiers disponibles dans le download center de l'utilisateur. " +
      "Exemples : « liste mes téléchargements », « quels fichiers disponibles ? »",
    parameters: z.object({}),
  })
  async listDownloadCenter() {
    try {
      const data = await this.boond.get<BoondDetailResponse>("/download-center");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_download_center_folder",
    description:
      "Récupère les détails d'un dossier du download center (liste des fichiers contenus).",
    parameters: z.object({
      perimeterManager: z.string().describe("Périmètre (ex: ID du manager / reference)"),
      folder: z.string().describe("Nom du dossier"),
    }),
  })
  async getDownloadCenterFolder({
    perimeterManager,
    folder,
  }: {
    perimeterManager: string;
    folder: string;
  }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<DownloadCenterAttributes>>(
        `/download-center/${encodeURIComponent(perimeterManager)}/${encodeURIComponent(folder)}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_download_center_file",
    description: "Récupère les détails d'un fichier spécifique dans un dossier du download center.",
    parameters: z.object({
      perimeterManager: z.string().describe("Périmètre"),
      folder: z.string().describe("Nom du dossier"),
      file: z.string().describe("Nom du fichier"),
    }),
  })
  async getDownloadCenterFile({
    perimeterManager,
    folder,
    file,
  }: {
    perimeterManager: string;
    folder: string;
    file: string;
  }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<DownloadCenterAttributes>>(
        `/download-center/${encodeURIComponent(perimeterManager)}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "download_download_center_folder",
    description: "Télécharge l'ensemble d'un dossier du download center sous forme d'archive.",
    parameters: z.object({
      perimeterManager: z.string().describe("Périmètre"),
      folder: z.string().describe("Nom du dossier"),
    }),
  })
  async downloadDownloadCenterFolder({
    perimeterManager,
    folder,
  }: {
    perimeterManager: string;
    folder: string;
  }) {
    try {
      const data = await this.boond.get<unknown>(
        `/download-center/${encodeURIComponent(perimeterManager)}/${encodeURIComponent(folder)}/download`,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Downloaded folder ${folder}`,
            data,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_download_center_folder",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un dossier (et son contenu) du download center.",
    parameters: z.object({
      perimeterManager: z.string().describe("Périmètre"),
      folder: z.string().describe("Nom du dossier à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteDownloadCenterFolder({
    perimeterManager,
    folder,
  }: {
    perimeterManager: string;
    folder: string;
  }) {
    try {
      await this.boond.delete(
        `/download-center/${encodeURIComponent(perimeterManager)}/${encodeURIComponent(folder)}`,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Deleted folder ${folder}`,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_download_center_file",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un fichier du download center. Opération irréversible.",
    parameters: z.object({
      perimeterManager: z.string().describe("Périmètre"),
      folder: z.string().describe("Nom du dossier"),
      file: z.string().describe("Nom du fichier à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteDownloadCenterFile({
    perimeterManager,
    folder,
    file,
  }: {
    perimeterManager: string;
    folder: string;
    file: string;
  }) {
    try {
      await this.boond.delete(
        `/download-center/${encodeURIComponent(perimeterManager)}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Deleted file ${file}`,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_download_center_visitor_access",
    description:
      "Crée un lien d'accès visiteur (URL publique temporaire) pour un dossier du download center.",
    parameters: z.object({
      perimeterManager: z.string().describe("Périmètre"),
      folder: z.string().describe("Nom du dossier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createDownloadCenterVisitorAccess({
    perimeterManager,
    folder,
  }: {
    perimeterManager: string;
    folder: string;
  }) {
    try {
      const response = await this.boond.post<BoondDetailResponse>(
        `/download-center/${encodeURIComponent(perimeterManager)}/${encodeURIComponent(folder)}/visitor-access`,
        {},
      );
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Visitor access created for ${folder}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_download_center_visitor_access",
    description: "⚠️ Révoque le lien d'accès visiteur d'un dossier du download center.",
    parameters: z.object({
      perimeterManager: z.string().describe("Périmètre"),
      folder: z.string().describe("Nom du dossier"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteDownloadCenterVisitorAccess({
    perimeterManager,
    folder,
  }: {
    perimeterManager: string;
    folder: string;
  }) {
    try {
      await this.boond.delete(
        `/download-center/${encodeURIComponent(perimeterManager)}/${encodeURIComponent(folder)}/visitor-access`,
      );
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Visitor access revoked for ${folder}`,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
