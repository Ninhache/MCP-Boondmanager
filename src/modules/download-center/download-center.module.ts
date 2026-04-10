import { Module } from "@nestjs/common";
import { DownloadCenterTools } from "./download-center.tools.js";

@Module({
  providers: [DownloadCenterTools],
})
export class DownloadCenterModule {}
