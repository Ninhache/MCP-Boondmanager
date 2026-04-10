import { Module } from "@nestjs/common";
import { DashboardsTools } from "./dashboards.tools.js";

@Module({
  providers: [DashboardsTools],
})
export class DashboardsModule {}
