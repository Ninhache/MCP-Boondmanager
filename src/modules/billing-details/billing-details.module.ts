import { Module } from "@nestjs/common";
import { BillingDetailsTools } from "./billing-details.tools.js";

@Module({
  providers: [BillingDetailsTools],
})
export class BillingDetailsModule {}
