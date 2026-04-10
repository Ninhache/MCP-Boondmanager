import { Module } from "@nestjs/common";
import { ProductsTools } from "./products.tools.js";

@Module({
  providers: [ProductsTools],
})
export class ProductsModule {}
