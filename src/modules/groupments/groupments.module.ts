import { Module } from "@nestjs/common";
import { GroupmentsTools } from "./groupments.tools.js";

@Module({
  providers: [GroupmentsTools],
})
export class GroupmentsModule {}
