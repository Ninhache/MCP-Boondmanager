import { Module } from "@nestjs/common";
import { AgenciesTools } from "./agencies.tools.js";

@Module({
  providers: [AgenciesTools],
})
export class AgenciesModule {}
