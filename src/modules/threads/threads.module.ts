import { Module } from "@nestjs/common";
import { ThreadsTools } from "./threads.tools.js";

@Module({
  providers: [ThreadsTools],
})
export class ThreadsModule {}
