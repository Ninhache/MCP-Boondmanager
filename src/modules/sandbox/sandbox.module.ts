import { Module } from "@nestjs/common";
import { SandboxTools } from "./sandbox.tools.js";

@Module({
  providers: [SandboxTools],
})
export class SandboxModule {}
