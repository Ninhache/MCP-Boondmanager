import { Module } from "@nestjs/common";
import { CalendarsTools } from "./calendars.tools.js";

@Module({
  providers: [CalendarsTools],
})
export class CalendarsModule {}
