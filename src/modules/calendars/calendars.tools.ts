import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { CalendarAttributes } from "../../generated/index.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class CalendarsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_calendars",
    description:
      "Récupère la liste paginée des calendriers de BoondManager. " +
      "Exemples de questions : « liste les calendriers », « quels calendriers existent ? »",
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
  async listCalendars({
    page,
    pageSize,
    fetchAll,
  }: {
    page?: number;
    pageSize?: number;
    fetchAll?: boolean;
  }) {
    return executeListTool<CalendarAttributes>(
      this.boond,
      {
        path: "/calendars",
        attributeKeys: ["name", "startDate", "endDate"],
      },
      { page, pageSize, fetchAll },
    );
  }
}
