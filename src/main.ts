#!/usr/bin/env node

import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ["error", "warn"],
  });
  app.enableShutdownHooks();
}

bootstrap().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
