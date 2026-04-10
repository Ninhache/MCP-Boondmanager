import { Module } from "@nestjs/common";
import { AbsencesReportsTools } from "./absences-reports.tools.js";

@Module({
  providers: [AbsencesReportsTools],
})
export class AbsencesReportsModule {}
