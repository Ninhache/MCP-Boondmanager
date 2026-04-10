import { Module } from "@nestjs/common";
import { StandardProfilesTools } from "./standard-profiles.tools.js";

@Module({
  providers: [StandardProfilesTools],
})
export class StandardProfilesModule {}
