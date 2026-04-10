import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { DashboardAttributes } from "../../generated/index.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class DashboardsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_dashboards",
    description:
      "Récupère la liste paginée des tableaux de bord. " +
      "Exemples : « liste les tableaux de bord », « quels dashboards existent ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      fetchAll: z
        .boolean()
        .optional()
        .describe("Si true, récupère toutes les pages jusqu'à la limite de sécurité"),
    }),
  })
  async listDashboards({
    page,
    pageSize,
    fetchAll,
  }: {
    page?: number;
    pageSize?: number;
    fetchAll?: boolean;
  }) {
    return executeListTool<DashboardAttributes>(
      this.boond,
      {
        path: "/dashboards",
        attributeKeys: ["name", "typeOf"],
      },
      { page, pageSize, fetchAll },
    );
  }
}
