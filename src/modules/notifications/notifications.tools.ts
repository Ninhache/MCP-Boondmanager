import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { NotificationAttributes } from "../../generated/index.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class NotificationsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_notifications",
    description:
      "Récupère la liste paginée des notifications système. " +
      "Exemples : « liste les notifications », « quelles sont mes notifications non lues ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listNotifications({
    page,
    pageSize,
    fetchAll,
  }: {
    page?: number;
    pageSize?: number;
    fetchAll?: boolean;
  }) {
    return executeListTool<NotificationAttributes>(
      this.boond,
      {
        path: "/notifications",
        attributeKeys: ["typeOf", "state", "date", "comment"],
      },
      { page, pageSize, fetchAll },
    );
  }
}
