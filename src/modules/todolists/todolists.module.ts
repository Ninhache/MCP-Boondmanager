import { Module } from "@nestjs/common";
import { TodolistsTools } from "./todolists.tools.js";

@Module({
  providers: [TodolistsTools],
})
export class TodolistsModule {}
