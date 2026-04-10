import { Module } from "@nestjs/common";
import { FormsTools } from "./forms.tools.js";

@Module({
  providers: [FormsTools],
})
export class FormsModule {}
