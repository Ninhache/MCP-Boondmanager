import { Global, Module } from "@nestjs/common";
import { BoondClient } from "./boond.client.js";

@Global()
@Module({
  providers: [
    {
      provide: BoondClient,
      useFactory: () => {
        const baseUrl = process.env.BOOND_API_URL;
        if (!baseUrl) {
          throw new Error("BOOND_API_URL environment variable is required");
        }

        const authMode = process.env.BOOND_AUTH_MODE ?? "basic";
        if (authMode !== "basic" && authMode !== "jwt") {
          throw new Error(`Invalid BOOND_AUTH_MODE "${authMode}": must be "basic" or "jwt"`);
        }

        return new BoondClient({
          baseUrl,
          authMode,
          username: process.env.BOOND_USERNAME,
          password: process.env.BOOND_PASSWORD,
          userToken: process.env.BOOND_USER_TOKEN,
          appToken: process.env.BOOND_APP_TOKEN,
          appKey: process.env.BOOND_APP_KEY,
          clientToken: process.env.BOOND_CLIENT_TOKEN,
          godClientToken: process.env.BOOND_GOD_CLIENT_TOKEN,
          jwtMode: (process.env.BOOND_JWT_MODE as "normal" | "god") ?? "normal",
        });
      },
    },
  ],
  exports: [BoondClient],
})
export class BoondModule {}
