import { Module } from "@nestjs/common";
import { FlagsTools } from "./flags.tools.js";

@Module({
  providers: [FlagsTools],
})
export class FlagsModule {}
