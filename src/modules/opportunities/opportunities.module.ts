import { Module } from "@nestjs/common";
import { OpportunitiesTools } from "./opportunities.tools.js";

@Module({
  providers: [OpportunitiesTools],
})
export class OpportunitiesModule {}
