import { Injectable } from "@nestjs/common";
import { Prompt } from "@rekog/mcp-nest";
import { z } from "zod";

/**
 * MCP Prompts — reusable conversation templates that guide the LLM
 * through common BoondManager workflows.
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
    }),
  })
  activityReport({ resourceId, month }: { resourceId: string; month: string }) {
    return {
      description: `Monthly activity report for resource ${resourceId} (${month})`,
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text:
              `Génère un rapport d'activité mensuel pour le collaborateur ID ${resourceId} pour le mois ${month}. ` +
              `Inclut : ses projets en cours (via get_resource avec tab=projects), ` +
              `ses absences sur le mois (via list_absences), ` +
              `et une synthèse de son activité. Présente le résultat de manière structurée.`,
          },
        },
      ],
    };
  }

  @Prompt({
    name: "find_available_consultants",
    description:
      "Find available consultants matching specific skills, with their current availability and projects.",
    parameters: z.object({
      skills: z.string().describe("Comma-separated skills (e.g. 'React, TypeScript')"),
    }),
  })
  findAvailableConsultants({ skills }: { skills: string }) {
    return {
      description: `Search for available consultants with skills: ${skills}`,
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text:
              `Trouve les consultants disponibles ayant les compétences : ${skills}. ` +
              `Utilise list_resources avec keywords pour filtrer, ` +
              `puis pour chaque résultat pertinent, récupère ses projets en cours ` +
              `et indique sa disponibilité estimée. Présente sous forme de tableau.`,
          },
        },
      ],
    };
  }

  @Prompt({
    name: "project_status_summary",
    description: "Summarize the status of a project: team, dates, opportunities, recent actions.",
    parameters: z.object({
      projectId: z.string().describe("Project ID in Boond"),
    }),
  })
  projectStatusSummary({ projectId }: { projectId: string }) {
    return {
      description: `Status summary for project ${projectId}`,
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text:
              `Fais un résumé complet du projet ID ${projectId} : ` +
              `utilise get_project pour les infos générales, ` +
              `liste les opportunités associées, ` +
              `et identifie les actions commerciales récentes. ` +
              `Conclus avec une évaluation du statut du projet.`,
          },
        },
      ],
    };
  }
}
