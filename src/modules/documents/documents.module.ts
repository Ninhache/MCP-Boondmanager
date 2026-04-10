import { Module } from "@nestjs/common";
import { DocumentsTools } from "./documents.tools.js";

@Module({
  providers: [DocumentsTools],
})
export class DocumentsModule {}
