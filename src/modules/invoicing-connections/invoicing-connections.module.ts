import { Module } from "@nestjs/common";
import { InvoicingConnectionsTools } from "./invoicing-connections.tools.js";

@Module({
  providers: [InvoicingConnectionsTools],
})
export class InvoicingConnectionsModule {}
