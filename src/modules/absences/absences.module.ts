import { Module } from "@nestjs/common";
import { AbsencesTools } from "./absences.tools.js";

@Module({
  providers: [AbsencesTools],
})
export class AbsencesModule {}
