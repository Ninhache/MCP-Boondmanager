import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, VendorAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class VendorTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_vendor",
    description: "Récupère le profil vendeur du compte (pour les développeurs d'apps marketplace).",
    parameters: z.object({}),
  })
  async getVendor() {
    try {
      const data = await this.boond.get<BoondDetailResponse<VendorAttributes>>("/vendor");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_vendor",
    description:
      "Met à jour le profil vendeur du compte (nom, contact, informations commerciales).",
    parameters: z.object({
      attributes: z
        .record(z.string(), z.unknown())
        .describe("Attributs à mettre à jour sur le profil vendeur"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateVendor({ attributes }: { attributes: Record<string, unknown> }) {
    try {
      const body = { data: { type: "vendor", attributes } };
      const response = await this.boond.put<BoondDetailResponse>("/vendor", body);
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: "✓ Vendor profile updated",
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_vendor_logo",
    description:
      "Met à jour le logo du profil vendeur. Le logo est passé via un objet d'attributs " +
      "(ex: URL ou base64 — dépend de l'implémentation Boond).",
    parameters: z.object({
      logo: z
        .record(z.string(), z.unknown())
        .describe("Données du logo (structure spécifique Boond)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateVendorLogo({ logo }: { logo: Record<string, unknown> }) {
    try {
      const body = { data: { type: "vendor", attributes: logo } };
      const response = await this.boond.put<BoondDetailResponse>("/vendor/logo", body);
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: "✓ Vendor logo updated",
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_vendor_logo",
    description: "⚠️ Supprime le logo du profil vendeur.",
    parameters: z.object({}),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteVendorLogo() {
    try {
      await this.boond.delete("/vendor/logo");
      return {
        content: [
          toTextContent({
            success: true,
            message: "✓ Vendor logo deleted",
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
