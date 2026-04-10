import { Module } from "@nestjs/common";
import { TechnicalDatasTools } from "./technical-datas.tools.js";

@Module({
  providers: [TechnicalDatasTools],
})
export class TechnicalDatasModule {}
