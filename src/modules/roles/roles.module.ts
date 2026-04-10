import { Module } from "@nestjs/common";
import { RolesTools } from "./roles.tools.js";

@Module({
  providers: [RolesTools],
})
export class RolesModule {}
