import { Module } from "@nestjs/common";
import { TimesTools } from "./times.tools.js";

@Module({
  providers: [TimesTools],
})
export class TimesModule {}
