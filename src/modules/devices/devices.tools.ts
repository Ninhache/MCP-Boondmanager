import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import { handleBoondError } from "../../utils/error-handler.js";
import { toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class DevicesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "delete_device",
    description:
      "⚠️ DESTRUCTIF — Supprime un device (session mobile) d'un utilisateur. " +
      "L'utilisateur sera déconnecté sur ce device. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du device à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteDevice({ id }: { id: number }) {
    try {
      await this.boond.delete(`/devices/${id}`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Device ${id} deleted`,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_device_session",
    description:
      "⚠️ DESTRUCTIF — Termine la session active d'un device (logout forcé). " +
      "Le device reste enregistré mais l'utilisateur doit se reconnecter.",
    parameters: z.object({
      id: z.number().describe("ID du device"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteDeviceSession({ id }: { id: number }) {
    try {
      await this.boond.delete(`/devices/${id}/session`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Device ${id} session terminated`,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
