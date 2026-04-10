import { Module } from "@nestjs/common";
import { TimesReportsTools } from "./times-reports.tools.js";

@Module({
  providers: [TimesReportsTools],
})
export class TimesReportsModule {}
