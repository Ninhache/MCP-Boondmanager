#!/usr/bin/env node

/**
 * BoondManager MCP Server — Entry point.
 * Reads configuration from environment variables and starts the server
 * with stdio transport (compatible with Claude Desktop, Claude Code, Cursor).
 */

import "dotenv/config";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { BoondClient, type BoondConfig, type JwtMode } from "./boond/client.js";
import { createServer } from "./server.js";

function loadConfig(): BoondConfig {
  const baseUrl = process.env.BOOND_API_URL;
  if (!baseUrl) {
    throw new Error("BOOND_API_URL environment variable is required");
  }

  const authMode = (process.env.BOOND_AUTH_MODE ?? "basic") as BoondConfig["authMode"];

  return {
    baseUrl,
    authMode,
    // Basic Auth
    username: process.env.BOOND_USERNAME,
    password: process.env.BOOND_PASSWORD,
    // JWT Auth
    userToken: process.env.BOOND_USER_TOKEN,
    appToken: process.env.BOOND_APP_TOKEN,
    appKey: process.env.BOOND_APP_KEY,
    clientToken: process.env.BOOND_CLIENT_TOKEN,
    godClientToken: process.env.BOOND_GOD_CLIENT_TOKEN,
    jwtMode: (process.env.BOOND_JWT_MODE as JwtMode) ?? "normal",
  };
}

async function main(): Promise<void> {
  const config = loadConfig();
  const boondClient = new BoondClient(config);
  const server = createServer(boondClient);
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
