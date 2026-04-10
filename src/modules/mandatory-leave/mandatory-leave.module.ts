import { Module } from "@nestjs/common";
import { MandatoryLeaveTools } from "./mandatory-leave.tools.js";

@Module({
  providers: [MandatoryLeaveTools],
})
export class MandatoryLeaveModule {}
