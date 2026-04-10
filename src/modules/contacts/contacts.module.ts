import { Module } from "@nestjs/common";
import { ContactsTools } from "./contacts.tools.js";

@Module({
  providers: [ContactsTools],
})
export class ContactsModule {}
