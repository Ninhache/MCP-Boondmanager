import { Module } from "@nestjs/common";
import { SavedSearchesTools } from "./savedsearches.tools.js";

@Module({
  providers: [SavedSearchesTools],
})
export class SavedSearchesModule {}
