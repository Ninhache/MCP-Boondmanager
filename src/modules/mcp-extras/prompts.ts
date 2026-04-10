import { Injectable } from "@nestjs/common";
import { Prompt } from "@rekog/mcp-nest";
import { z } from "zod";

type Locale = "fr" | "en";

const localeSchema = z.enum(["fr", "en"]).optional().describe("Output language (default: en)");

/**
 * MCP Prompts — reusable conversation templates that guide the LLM
 * through common BoondManager workflows.
 * All prompts support optional `locale` parameter ("fr" or "en", default "en").
 */
@Injectable()
export class BoondPrompts {
  @Prompt({
    name: "activity_report",
    description:
      "Generate a monthly activity report for a collaborator: projects, times, and absences.",
    parameters: z.object({
      resourceId: z.string().describe("Collaborator ID in Boond"),
      month: z.string().describe("Month in YYYY-MM format (e.g. 2026-04)"),
      locale: localeSchema,
    }),
  })
  activityReport({
    resourceId,
    month,
    locale = "en",
  }: {
    resourceId: string;
    month: string;
    locale?: Locale;
  }) {
    const text =
      locale === "fr"
        ? `Génère un rapport d'activité mensuel pour le collaborateur ID ${resourceId} pour le mois ${month}. ` +
          `Inclut : ses projets en cours (via get_resource avec tab=projects), ` +
          `ses absences sur le mois (via list_absences), ` +
          `et une synthèse de son activité. Présente le résultat de manière structurée.`
        : `Generate a monthly activity report for collaborator ID ${resourceId} for ${month}. ` +
          `Include: current projects (via get_resource with tab=projects), ` +
          `absences during the month (via list_absences), ` +
          `and an activity summary. Present the result in a structured format.`;

    return {
      description: `Monthly activity report for resource ${resourceId} (${month})`,
      messages: [{ role: "user" as const, content: { type: "text" as const, text } }],
    };
  }

  @Prompt({
    name: "find_available_consultants",
    description:
      "Find available consultants matching specific skills, with their current availability and projects.",
    parameters: z.object({
      skills: z.string().describe("Comma-separated skills (e.g. 'React, TypeScript')"),
      locale: localeSchema,
    }),
  })
  findAvailableConsultants({ skills, locale = "en" }: { skills: string; locale?: Locale }) {
    const text =
      locale === "fr"
        ? `Trouve les consultants disponibles ayant les compétences : ${skills}. ` +
          `Utilise list_resources avec keywords pour filtrer, ` +
          `puis pour chaque résultat pertinent, récupère ses projets en cours ` +
          `et indique sa disponibilité estimée. Présente sous forme de tableau.`
        : `Find available consultants with the following skills: ${skills}. ` +
          `Use list_resources with keywords to filter, ` +
          `then for each relevant result, fetch their current projects ` +
          `and indicate their estimated availability. Present as a table.`;

    return {
      description: `Search for available consultants with skills: ${skills}`,
      messages: [{ role: "user" as const, content: { type: "text" as const, text } }],
    };
  }

  @Prompt({
    name: "project_status_summary",
    description: "Summarize the status of a project: team, dates, opportunities, recent actions.",
    parameters: z.object({
      projectId: z.string().describe("Project ID in Boond"),
      locale: localeSchema,
    }),
  })
  projectStatusSummary({ projectId, locale = "en" }: { projectId: string; locale?: Locale }) {
    const text =
      locale === "fr"
        ? `Fais un résumé complet du projet ID ${projectId} : ` +
          `utilise get_project pour les infos générales, ` +
          `liste les opportunités associées, ` +
          `et identifie les actions commerciales récentes. ` +
          `Conclus avec une évaluation du statut du projet.`
        : `Provide a complete summary of project ID ${projectId}: ` +
          `use get_project for general info, ` +
          `list associated opportunities, ` +
          `and identify recent commercial actions. ` +
          `Conclude with an assessment of the project status.`;

    return {
      description: `Status summary for project ${projectId}`,
      messages: [{ role: "user" as const, content: { type: "text" as const, text } }],
    };
  }
}
