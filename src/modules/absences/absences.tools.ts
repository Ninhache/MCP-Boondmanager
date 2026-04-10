import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { AbsenceAttributes } from "../../generated/index.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class AbsencesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_absences",
    description:
      "Récupère la liste paginée des absences / congés. " +
      "Exemples : « qui est absent ? », « liste les congés en cours »",
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
  async listAbsences({
    page,
    pageSize,
    fetchAll,
  }: {
    page?: number;
    pageSize?: number;
    fetchAll?: boolean;
  }) {
    return executeListTool<AbsenceAttributes>(
      this.boond,
      {
        path: "/absences",
        attributeKeys: [
          "startDate",
          "endDate",
          "duration",
          "title",
          "workUnitType",
          "activityType",
        ],
      },
      { page, pageSize, fetchAll },
    );
  }
}
