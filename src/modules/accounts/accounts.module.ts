import { Module } from "@nestjs/common";
import { AccountsTools } from "./accounts.tools.js";

@Module({
  providers: [AccountsTools],
})
export class AccountsModule {}
