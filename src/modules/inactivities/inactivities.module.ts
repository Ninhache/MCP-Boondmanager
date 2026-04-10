import { Module } from "@nestjs/common";
import { InactivitiesTools } from "./inactivities.tools.js";

@Module({
  providers: [InactivitiesTools],
})
export class InactivitiesModule {}
