import { Module } from "@nestjs/common";
import { InvoicesTools } from "./invoices.tools.js";

@Module({
  providers: [InvoicesTools],
})
export class InvoicesModule {}
