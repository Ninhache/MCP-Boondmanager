import { Module } from "@nestjs/common";
import { BankingTransactionsTools } from "./banking-transactions.tools.js";

@Module({
  providers: [BankingTransactionsTools],
})
export class BankingTransactionsModule {}
