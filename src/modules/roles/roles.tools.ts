import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { RoleAttributes } from "../../generated/index.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class RolesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_roles",
    description:
      "Récupère la liste paginée des rôles utilisateurs. " +
      "Exemples : « liste les rôles disponibles », « quels sont les rôles définis dans le système ? »",
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
  async listRoles({
    page,
    pageSize,
    fetchAll,
  }: {
    page?: number;
    pageSize?: number;
    fetchAll?: boolean;
  }) {
    return executeListTool<RoleAttributes>(
      this.boond,
      {
        path: "/roles",
        attributeKeys: ["name", "typeOf"],
      },
      { page, pageSize, fetchAll },
    );
  }
}
