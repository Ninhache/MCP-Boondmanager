import { Module } from "@nestjs/common";
import { OrdersTools } from "./orders.tools.js";

@Module({
  providers: [OrdersTools],
})
export class OrdersModule {}
