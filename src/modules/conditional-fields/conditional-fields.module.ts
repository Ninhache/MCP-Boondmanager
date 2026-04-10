import { Module } from "@nestjs/common";
import { ConditionalFieldsTools } from "./conditional-fields.tools.js";

@Module({
  providers: [ConditionalFieldsTools],
})
export class ConditionalFieldsModule {}
