#!/usr/bin/env node

import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import type { NextFunction, Request, Response } from "express";
import { AppModule } from "./app.module.js";

type TransportMode = "stdio" | "http";

function getTransportMode(): TransportMode {
  const raw = process.env.MCP_TRANSPORT ?? "stdio";
  if (raw !== "stdio" && raw !== "http") {
    throw new Error(`Invalid MCP_TRANSPORT "${raw}": must be "stdio" or "http"`);
  }
  return raw;
}

function parsePort(): number {
  const raw = process.env.MCP_HTTP_PORT ?? "3001";
  const port = Number.parseInt(raw, 10);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid MCP_HTTP_PORT "${raw}": must be an integer in 1-65535`);
  }
  return port;
}

/**
 * Bearer token auth middleware.
 * Only applied when MCP_HTTP_SECRET is set. If not set, a warning is logged
 * at startup and the endpoint is unauthenticated (dev/localhost only).
 */
function createAuthMiddleware(secret: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      res.status(401).json({ error: "Missing or invalid Authorization header" });
      return;
    }
    const token = header.slice("Bearer ".length);
    if (token !== secret) {
      res.status(403).json({ error: "Invalid token" });
      return;
    }
    next();
  };
}

async function bootstrapStdio(): Promise<void> {
  // stdio mode: used by Claude Desktop / Claude Code / Cursor as a local subprocess
  const app = await NestFactory.createApplicationContext(AppModule.forTransport("stdio"), {
    logger: ["error", "warn"],
  });
  app.enableShutdownHooks();
}

async function bootstrapHttp(): Promise<void> {
  const port = parsePort();
  const host = process.env.MCP_HTTP_HOST ?? "127.0.0.1";
  const secret = process.env.MCP_HTTP_SECRET;

  const app = await NestFactory.create(AppModule.forTransport("http"), {
    logger: ["error", "warn", "log"],
  });
  app.enableShutdownHooks();

  if (secret) {
    app.use("/mcp", createAuthMiddleware(secret));
  } else {
    console.warn(
      "⚠️  MCP_HTTP_SECRET is not set — /mcp endpoint is UNAUTHENTICATED. " +
        "Only safe on localhost or behind a trusted reverse proxy.",
    );
  }

  await app.listen(port, host);
  console.log(`MCP server listening on http://${host}:${port}/mcp`);
}

async function bootstrap(): Promise<void> {
  const transport = getTransportMode();
  if (transport === "http") {
    await bootstrapHttp();
  } else {
    await bootstrapStdio();
  }
}

bootstrap().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
