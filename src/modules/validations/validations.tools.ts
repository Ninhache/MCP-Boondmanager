import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { ValidationAttributes } from "../../generated/index.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { BoondClient } from "../boond/index.js";

@Injectable()
export class ValidationsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_validations",
    description:
      "Récupère la liste paginée des validations (workflow d'approbation). " +
      "Exemples : « liste les validations en attente », « quelles approbations sont requises ? »",
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
  async listValidations({
    page,
    pageSize,
    fetchAll,
  }: {
    page?: number;
    pageSize?: number;
    fetchAll?: boolean;
  }) {
    return executeListTool<ValidationAttributes>(
      this.boond,
      {
        path: "/validations",
        attributeKeys: ["state", "typeOf", "date"],
      },
      { page, pageSize, fetchAll },
    );
  }
}
