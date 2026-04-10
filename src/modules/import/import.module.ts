import { Module } from "@nestjs/common";
import { ImportTools } from "./import.tools.js";

@Module({
  providers: [ImportTools],
})
export class ImportModule {}
