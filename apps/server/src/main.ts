import "reflect-metadata";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module.js";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3000";
  app.enableCors({
    origin: corsOrigin === "*" ? true : corsOrigin.split(",").map((item) => item.trim()),
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false
  });

  const apiPrefix = process.env.API_PREFIX ?? "";
  if (apiPrefix.trim().length > 0) {
    app.setGlobalPrefix(apiPrefix);
  }

  const port = Number(process.env.SERVER_PORT ?? 3001);
  await app.listen(port, "0.0.0.0");
}

void bootstrap();
