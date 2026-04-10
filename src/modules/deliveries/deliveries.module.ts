import { Module } from "@nestjs/common";
import { DeliveriesTools } from "./deliveries.tools.js";

@Module({
  providers: [DeliveriesTools],
})
export class DeliveriesModule {}
