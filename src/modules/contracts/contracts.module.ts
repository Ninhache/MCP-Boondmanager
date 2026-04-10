import { Module } from "@nestjs/common";
import { ContractsTools } from "./contracts.tools.js";

@Module({
  providers: [ContractsTools],
})
export class ContractsModule {}
