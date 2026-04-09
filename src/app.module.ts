import { Module } from "@nestjs/common";
import { McpModule, McpTransportType } from "@rekog/mcp-nest";
import { BoondModule } from "./modules/boond/boond.module.js";
import { CandidatesModule } from "./modules/candidates/candidates.module.js";
import { OpportunitiesModule } from "./modules/opportunities/opportunities.module.js";
import { ProjectsModule } from "./modules/projects/projects.module.js";
import { ResourcesModule } from "./modules/resources/resources.module.js";

@Module({
  imports: [
    McpModule.forRoot({
      name: "boond-mcp-server",
      version: "0.1.0",
      description: "MCP server wrapping the BoondManager REST API",
      transport: McpTransportType.STDIO,
    }),
    BoondModule,
    ResourcesModule,
    ProjectsModule,
    CandidatesModule,
    OpportunitiesModule,
  ],
})
export class AppModule {}
