import { Module } from "@nestjs/common";
import { CandidatesTools } from "./candidates.tools.js";

@Module({
  providers: [CandidatesTools],
})
export class CandidatesModule {}
