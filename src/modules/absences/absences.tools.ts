import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { AbsenceAttributes, BoondListResponse } from "../../generated/index.js";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatList, toTextContent } from "../../utils/formatters.js";
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
    }),
  })
  async listAbsences({ page, pageSize }: { page?: number; pageSize?: number }) {
    const params: Record<string, string> = {
      maxResults: String(pageSize ?? DEFAULT_PAGE_SIZE),
    };
    if (page != null) params.page = String(page);

    try {
      const data = await this.boond.get<BoondListResponse<AbsenceAttributes>>("/absences", params);
      const formatted = formatList(data, [
        "startDate",
        "endDate",
        "duration",
        "state",
        "typeOf",
        "comment",
      ]);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
