import { Module } from "@nestjs/common";
import { ShareTools } from "./share.tools.js";

@Module({
  providers: [ShareTools],
})
export class ShareModule {}
