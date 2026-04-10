import { Module } from "@nestjs/common";
import { ExpensesReportsTools } from "./expenses-reports.tools.js";

@Module({
  providers: [ExpensesReportsTools],
})
export class ExpensesReportsModule {}
