import { Module } from "@nestjs/common";
import { MarketplaceTools } from "./marketplace.tools.js";

@Module({
  providers: [MarketplaceTools],
})
export class MarketplaceModule {}
