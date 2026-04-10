import { type DynamicModule, Module } from "@nestjs/common";
import { McpModule, McpTransportType } from "@rekog/mcp-nest";
import { AbsencesModule } from "./modules/absences/absences.module.js";
import { AccountsModule } from "./modules/accounts/accounts.module.js";
import { ActionsModule } from "./modules/actions/actions.module.js";
import { AgenciesModule } from "./modules/agencies/agencies.module.js";
import { BoondModule } from "./modules/boond/boond.module.js";
import { CalendarsModule } from "./modules/calendars/calendars.module.js";
import { CandidatesModule } from "./modules/candidates/candidates.module.js";
import { CompaniesModule } from "./modules/companies/companies.module.js";
import { ContactsModule } from "./modules/contacts/contacts.module.js";
import { DashboardsModule } from "./modules/dashboards/dashboards.module.js";
import { ExpensesModule } from "./modules/expenses/expenses.module.js";
import { InvoicesModule } from "./modules/invoices/invoices.module.js";
import { McpExtrasModule } from "./modules/mcp-extras/mcp-extras.module.js";
import { NotificationsModule } from "./modules/notifications/notifications.module.js";
import { OpportunitiesModule } from "./modules/opportunities/opportunities.module.js";
import { OrdersModule } from "./modules/orders/orders.module.js";
import { PaymentsModule } from "./modules/payments/payments.module.js";
import { PolesModule } from "./modules/poles/poles.module.js";
import { PositioningsModule } from "./modules/positionings/positionings.module.js";
import { ProductsModule } from "./modules/products/products.module.js";
import { ProjectsModule } from "./modules/projects/projects.module.js";
import { PurchasesModule } from "./modules/purchases/purchases.module.js";
import { ResourcesModule } from "./modules/resources/resources.module.js";
import { RolesModule } from "./modules/roles/roles.module.js";
import { TimesModule } from "./modules/times/times.module.js";
import { ValidationsModule } from "./modules/validations/validations.module.js";

const DOMAIN_MODULES = [
  BoondModule,
  // Core
  ResourcesModule,
  ProjectsModule,
  CandidatesModule,
  CompaniesModule,
  OpportunitiesModule,
  AbsencesModule,
  ActionsModule,
  // Commercial / financial
  PositioningsModule,
  PurchasesModule,
  InvoicesModule,
  OrdersModule,
  ExpensesModule,
  ProductsModule,
  PaymentsModule,
  TimesModule,
  // Organizational
  AgenciesModule,
  PolesModule,
  CalendarsModule,
  DashboardsModule,
  // Admin / system
  NotificationsModule,
  ValidationsModule,
  RolesModule,
  AccountsModule,
  ContactsModule,
  // MCP Prompts and Resources
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
