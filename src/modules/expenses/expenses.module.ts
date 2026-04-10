import { Module } from "@nestjs/common";
import { ExpensesTools } from "./expenses.tools.js";

@Module({
  providers: [ExpensesTools],
})
export class ExpensesModule {}
