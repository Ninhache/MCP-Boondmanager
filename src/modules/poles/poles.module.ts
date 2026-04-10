import { Module } from "@nestjs/common";
import { PolesTools } from "./poles.tools.js";

@Module({
  providers: [PolesTools],
})
export class PolesModule {}
