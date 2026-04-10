import { Module } from "@nestjs/common";
import { PositioningsTools } from "./positionings.tools.js";

@Module({
  providers: [PositioningsTools],
})
export class PositioningsModule {}
