import { Module } from "@nestjs/common";
import { WebhooksTools } from "./webhooks.tools.js";

@Module({
  providers: [WebhooksTools],
})
export class WebhooksModule {}
