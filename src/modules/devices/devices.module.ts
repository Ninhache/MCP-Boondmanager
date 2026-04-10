import { Module } from "@nestjs/common";
import { DevicesTools } from "./devices.tools.js";

@Module({
  providers: [DevicesTools],
})
export class DevicesModule {}
