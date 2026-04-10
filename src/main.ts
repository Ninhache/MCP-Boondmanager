#!/usr/bin/env node

import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

type TransportMode = "stdio" | "http";

function getTransportMode(): TransportMode {
  const raw = process.env.MCP_TRANSPORT ?? "stdio";
  if (raw !== "stdio" && raw !== "http") {
    throw new Error(`Invalid MCP_TRANSPORT "${raw}": must be "stdio" or "http"`);
  }
  return raw;
}

async function bootstrap(): Promise<void> {
  const transport = getTransportMode();

  if (transport === "http") {
    // HTTP mode: start an Express server with Streamable HTTP transport
    // Endpoint: POST /mcp (handled by @rekog/mcp-nest)
    const port = Number(process.env.MCP_HTTP_PORT ?? 3001);
    const app = await NestFactory.create(AppModule.forTransport("http"), {
      logger: ["error", "warn", "log"],
    });
    app.enableShutdownHooks();
    await app.listen(port);
    console.log(`MCP server listening on http://localhost:${port}/mcp`);
    return;
  }

  // stdio mode: default, used by Claude Desktop / Claude Code / Cursor
  const app = await NestFactory.createApplicationContext(AppModule.forTransport("stdio"), {
    logger: ["error", "warn"],
  });
  app.enableShutdownHooks();
}

bootstrap().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
