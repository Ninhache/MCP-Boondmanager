import { Module } from "@nestjs/common";
import { PaymentsTools } from "./payments.tools.js";

@Module({
  providers: [PaymentsTools],
})
export class PaymentsModule {}
