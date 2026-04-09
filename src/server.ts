import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { BoondClient } from "./boond/client.js";
import type { JsonApiResponse } from "./boond/types.js";
import { formatDetail, formatList, toTextContent } from "./utils/formatters.js";

const DEFAULT_PAGE_SIZE = "25";

export function createServer(boondClient: BoondClient): McpServer {
  const server = new McpServer({
    name: "boond-mcp-server",
    version: "0.1.0",
  });

  // ─── Resources (Collaborateurs) ───────────────────────────────

  server.registerTool(
    "list_resources",
    {
      title: "Lister les collaborateurs",
      description:
        "Récupère la liste paginée des collaborateurs (resources) de BoondManager. " +
        "Exemples de questions : « liste mes collaborateurs », « qui travaille chez nous ? »",
      inputSchema: {
        page: z.number().optional().describe("Numéro de page (défaut: 1)"),
        pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
        keywords: z.string().optional().describe("Recherche par mots-clés (nom, prénom, email)"),
      },
    },
    async ({ page, pageSize, keywords }) => {
      const params: Record<string, string> = {
        maxResults: String(pageSize ?? DEFAULT_PAGE_SIZE),
      };
      if (page) params.page = String(page);
      if (keywords) params.keywords = keywords;

      const data = await boondClient.get<JsonApiResponse>("/resources", params);
      const formatted = formatList(data, ["firstName", "lastName", "email", "title", "state"]);
      return { content: [toTextContent(formatted)] };
    },
  );

  server.registerTool(
    "get_resource",
    {
      title: "Détail d'un collaborateur",
      description:
        "Récupère les informations détaillées d'un collaborateur par son ID. " +
        "Peut retourner un onglet spécifique (information, projects, absences, etc.).",
      inputSchema: {
        id: z.number().describe("ID du collaborateur dans Boond"),
        tab: z
          .string()
          .optional()
          .describe(
            "Onglet spécifique : information, projects, absences, timesReport, expensesReport",
          ),
      },
    },
    async ({ id, tab }) => {
      const path = tab ? `/resources/${id}/${tab}` : `/resources/${id}`;
      const data = await boondClient.get<JsonApiResponse>(path);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    },
  );

  // ─── Projects (Projets / Missions) ───────────────────────────

  server.registerTool(
    "list_projects",
    {
      title: "Lister les projets",
      description:
        "Récupère la liste paginée des projets / missions. " +
        "Exemples : « quels sont les projets en cours ? », « liste les missions »",
      inputSchema: {
        page: z.number().optional().describe("Numéro de page (défaut: 1)"),
        pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
        keywords: z.string().optional().describe("Recherche par mots-clés"),
      },
    },
    async ({ page, pageSize, keywords }) => {
      const params: Record<string, string> = {
        maxResults: String(pageSize ?? DEFAULT_PAGE_SIZE),
      };
      if (page) params.page = String(page);
      if (keywords) params.keywords = keywords;

      const data = await boondClient.get<JsonApiResponse>("/projects", params);
      const formatted = formatList(data, ["name", "reference", "state", "startDate", "endDate"]);
      return { content: [toTextContent(formatted)] };
    },
  );

  server.registerTool(
    "get_project",
    {
      title: "Détail d'un projet",
      description: "Récupère les informations détaillées d'un projet / mission par son ID.",
      inputSchema: {
        id: z.number().describe("ID du projet dans Boond"),
      },
    },
    async ({ id }) => {
      const data = await boondClient.get<JsonApiResponse>(`/projects/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    },
  );

  // ─── Candidates (Candidats) ───────────────────────────────────

  server.registerTool(
    "search_candidates",
    {
      title: "Rechercher des candidats",
      description:
        "Recherche des candidats dans la base BoondManager. " +
        "Exemples : « trouve des développeurs Java », « candidats disponibles »",
      inputSchema: {
        keywords: z.string().describe("Mots-clés de recherche (nom, compétences, etc.)"),
        page: z.number().optional().describe("Numéro de page (défaut: 1)"),
        pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      },
    },
    async ({ keywords, page, pageSize }) => {
      const params: Record<string, string> = {
        keywords,
        maxResults: String(pageSize ?? DEFAULT_PAGE_SIZE),
      };
      if (page) params.page = String(page);

      const data = await boondClient.get<JsonApiResponse>("/candidates", params);
      const formatted = formatList(data, ["firstName", "lastName", "email", "state", "title"]);
      return { content: [toTextContent(formatted)] };
    },
  );

  server.registerTool(
    "get_candidate",
    {
      title: "Détail d'un candidat",
      description: "Récupère les informations détaillées d'un candidat par son ID.",
      inputSchema: {
        id: z.number().describe("ID du candidat dans Boond"),
      },
    },
    async ({ id }) => {
      const data = await boondClient.get<JsonApiResponse>(`/candidates/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    },
  );

  return server;
}
