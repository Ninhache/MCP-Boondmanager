import { type DynamicModule, Module } from "@nestjs/common";
import { McpModule, McpTransportType } from "@rekog/mcp-nest";
import { AbsencesModule } from "./modules/absences/absences.module.js";
import { ActionsModule } from "./modules/actions/actions.module.js";
import { BoondModule } from "./modules/boond/boond.module.js";
import { CandidatesModule } from "./modules/candidates/candidates.module.js";
import { CompaniesModule } from "./modules/companies/companies.module.js";
import { McpExtrasModule } from "./modules/mcp-extras/mcp-extras.module.js";
import { OpportunitiesModule } from "./modules/opportunities/opportunities.module.js";
import { ProjectsModule } from "./modules/projects/projects.module.js";
import { ResourcesModule } from "./modules/resources/resources.module.js";

const DOMAIN_MODULES = [
  BoondModule,
  ResourcesModule,
  ProjectsModule,
  CandidatesModule,
  CompaniesModule,
  OpportunitiesModule,
  AbsencesModule,
  ActionsModule,
  McpExtrasModule,
];

const MCP_SERVER_CONFIG = {
  name: "boond-mcp-server",
  version: "0.1.0",
  description: "MCP server wrapping the BoondManager REST API",
};

@Module({})
export class AppModule {
  /**
   * Build the AppModule with the selected transport.
   * - "stdio" (default): for Claude Desktop, Claude Code, Cursor (local subprocess)
   * - "http": Streamable HTTP for n8n, remote clients, multi-user deployment
   */
  static forTransport(transport: "stdio" | "http"): DynamicModule {
    const transportType =
      transport === "http" ? McpTransportType.STREAMABLE_HTTP : McpTransportType.STDIO;

    return {
      module: AppModule,
      imports: [
        McpModule.forRoot({
          ...MCP_SERVER_CONFIG,
          transport: transportType,
        }),
        ...DOMAIN_MODULES,
      ],
    };
  }
}
