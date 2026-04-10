import { Injectable } from "@nestjs/common";
import { Resource } from "@rekog/mcp-nest";
import { BoondClient } from "../boond/index.js";

interface MetaResponse {
  meta?: {
    version?: string;
    isLogged?: boolean;
    language?: string;
    totals?: { rows?: number };
  };
  data?: Array<{ id: string; type: string }>;
}

/**
 * MCP Resources — read-only data snapshots exposed to the LLM host.
 * Unlike tools, resources are browsed/selected by the host application,
 * not invoked directly by the LLM.
 */
@Injectable()
export class BoondResources {
  constructor(private readonly boond: BoondClient) {}

  @Resource({
    uri: "boond://config",
    name: "BoondManager Configuration",
    description: "Current BoondManager instance version, language, and login status",
    mimeType: "application/json",
  })
  async getConfig() {
    try {
      const data = await this.boond.get<MetaResponse>("/resources", { maxResults: "1" });
      return {
        contents: [
          {
            uri: "boond://config",
            mimeType: "application/json",
            text: JSON.stringify(
              {
                version: data.meta?.version ?? "unknown",
                language: data.meta?.language ?? "unknown",
                isLogged: data.meta?.isLogged ?? false,
                apiUrl: process.env.BOOND_API_URL,
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      return {
        contents: [
          {
            uri: "boond://config",
            mimeType: "application/json",
            text: JSON.stringify({ error: msg }, null, 2),
          },
        ],
      };
    }
  }

  @Resource({
    uri: "boond://stats",
    name: "BoondManager Statistics",
    description: "Quick stats: total counts of resources, projects, candidates, companies",
    mimeType: "application/json",
  })
  async getStats() {
    const endpoints = [
      { key: "resources", path: "/resources" },
      { key: "projects", path: "/projects" },
      { key: "candidates", path: "/candidates" },
      { key: "companies", path: "/companies" },
      { key: "opportunities", path: "/opportunities" },
    ];

    const stats: Record<string, number | string> = {};
    for (const { key, path } of endpoints) {
      try {
        const data = await this.boond.get<MetaResponse>(path, { maxResults: "1" });
        stats[key] = data.meta?.totals?.rows ?? 0;
      } catch (error) {
        stats[key] = error instanceof Error ? `error: ${error.message}` : "error";
      }
    }

    return {
      contents: [
        {
          uri: "boond://stats",
          mimeType: "application/json",
          text: JSON.stringify(stats, null, 2),
        },
      ],
    };
  }
}
