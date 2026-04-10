import { Module } from "@nestjs/common";
import { LogsTools } from "./logs.tools.js";

@Module({
  providers: [LogsTools],
})
export class LogsModule {}
