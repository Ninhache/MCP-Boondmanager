import { Module } from "@nestjs/common";
import { BusinessUnitsTools } from "./business-units.tools.js";

@Module({
  providers: [BusinessUnitsTools],
})
export class BusinessUnitsModule {}
