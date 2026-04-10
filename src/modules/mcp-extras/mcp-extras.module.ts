import { Module } from "@nestjs/common";
import { BoondPrompts } from "./prompts.js";
import { BoondResources } from "./resources.js";

@Module({
  providers: [BoondPrompts, BoondResources],
})
export class McpExtrasModule {}
