import "reflect-metadata";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module.js";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const apiPrefix = process.env.API_PREFIX ?? "";
  if (apiPrefix.trim().length > 0) {
    app.setGlobalPrefix(apiPrefix);
  }

  const port = Number(process.env.SERVER_PORT ?? 3001);
  await app.listen(port);
}

void bootstrap();
