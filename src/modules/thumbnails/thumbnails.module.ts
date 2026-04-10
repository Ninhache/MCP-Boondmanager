import { Module } from "@nestjs/common";
import { ThumbnailsTools } from "./thumbnails.tools.js";

@Module({
  providers: [ThumbnailsTools],
})
export class ThumbnailsModule {}
