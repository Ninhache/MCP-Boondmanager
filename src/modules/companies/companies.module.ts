import { Module } from "@nestjs/common";
import { CompaniesTools } from "./companies.tools.js";

@Module({
  providers: [CompaniesTools],
})
export class CompaniesModule {}
