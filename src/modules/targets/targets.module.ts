import { Module } from "@nestjs/common";
import { TargetsTools } from "./targets.tools.js";

@Module({
  providers: [TargetsTools],
})
export class TargetsModule {}
