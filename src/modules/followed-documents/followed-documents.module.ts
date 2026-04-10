import { Module } from "@nestjs/common";
import { FollowedDocumentsTools } from "./followed-documents.tools.js";

@Module({
  providers: [FollowedDocumentsTools],
})
export class FollowedDocumentsModule {}
