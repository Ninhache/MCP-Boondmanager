import { Module } from "@nestjs/common";
import { AdministratorTools } from "./administrator.tools.js";

@Module({
  providers: [AdministratorTools],
})
export class AdministratorModule {}
