import { Module } from "@nestjs/common";
import { PurchasesTools } from "./purchases.tools.js";

@Module({
  providers: [PurchasesTools],
})
export class PurchasesModule {}
