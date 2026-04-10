import { Module } from "@nestjs/common";
import { ValidationsTools } from "./validations.tools.js";

@Module({
  providers: [ValidationsTools],
})
export class ValidationsModule {}
