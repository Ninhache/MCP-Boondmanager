import { Module } from "@nestjs/common";
import { ProjectsTools } from "./projects.tools.js";

@Module({
  providers: [ProjectsTools],
})
export class ProjectsModule {}
