import { Module } from "@nestjs/common";
import { ResourcesTools } from "./resources.tools.js";

@Module({
  providers: [ResourcesTools],
})
export class ResourcesModule {}
