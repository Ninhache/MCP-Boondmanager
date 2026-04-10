import { Module } from "@nestjs/common";
import { ProviderInvoicesTools } from "./provider-invoices.tools.js";

@Module({
  providers: [ProviderInvoicesTools],
})
export class ProviderInvoicesModule {}
