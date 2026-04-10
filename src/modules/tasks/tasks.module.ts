import { Module } from "@nestjs/common";
import { TasksTools } from "./tasks.tools.js";

@Module({
  providers: [TasksTools],
})
export class TasksModule {}
