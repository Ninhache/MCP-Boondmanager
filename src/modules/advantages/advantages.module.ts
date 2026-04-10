import { Module } from "@nestjs/common";
import { AdvantagesTools } from "./advantages.tools.js";

@Module({
  providers: [AdvantagesTools],
})
export class AdvantagesModule {}
