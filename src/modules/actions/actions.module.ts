import { Module } from "@nestjs/common";
import { ActionsTools } from "./actions.tools.js";

@Module({
  providers: [ActionsTools],
})
export class ActionsModule {}
