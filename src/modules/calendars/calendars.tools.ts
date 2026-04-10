import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import { handleBoondError } from "../../utils/error-handler.js";
import { toTextContent } from "../../utils/formatters.js";
import { BoondClient } from "../boond/index.js";

/**
 * Calendars use a non-standard JSON:API shape — items are `{ iso, value }`
 * directly on data, not `{ id, attributes: {...} }`. We can't use the
 * standard executeListTool helper.
 */
interface CalendarItem {
  iso: string;
  value: string;
  subCalendars?: { iso: string; value: string }[];
}

interface CalendarsResponse {
  data: CalendarItem[];
  meta?: { totals?: { rows?: number } };
}

@Injectable()
export class CalendarsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_calendars",
    description:
      "Récupère la liste des calendriers disponibles dans BoondManager. " +
      "Exemples de questions : « liste les calendriers », « quels calendriers existent ? »",
    parameters: z.object({}),
  })
  async listCalendars() {
    try {
      const data = await this.boond.get<CalendarsResponse>("/calendars");
      const items = (Array.isArray(data.data) ? data.data : []).map((c) => ({
        iso: c.iso,
        value: c.value,
        subCalendars: c.subCalendars,
      }));
      return {
        content: [
          toTextContent({
            total: data.meta?.totals?.rows ?? items.length,
            items,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }
}
