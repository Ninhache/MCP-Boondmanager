import { Module } from "@nestjs/common";
import { SubscriptionTools } from "./subscription.tools.js";

@Module({
  providers: [SubscriptionTools],
})
export class SubscriptionModule {}
