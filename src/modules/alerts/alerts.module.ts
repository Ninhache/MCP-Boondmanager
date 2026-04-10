import { Module } from "@nestjs/common";
import { AlertsTools } from "./alerts.tools.js";

@Module({
  providers: [AlertsTools],
})
export class AlertsModule {}
