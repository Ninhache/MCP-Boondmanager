import { Module } from "@nestjs/common";
import { VendorTools } from "./vendor.tools.js";

@Module({
  providers: [VendorTools],
})
export class VendorModule {}
