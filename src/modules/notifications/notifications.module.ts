import { Module } from "@nestjs/common";
import { NotificationsTools } from "./notifications.tools.js";

@Module({
  providers: [NotificationsTools],
})
export class NotificationsModule {}
