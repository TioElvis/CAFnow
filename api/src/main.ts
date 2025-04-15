import { NestFactory } from "@nestjs/core";
import FastifyCookie from "@fastify/cookie";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./modules/app.module";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
  );

  const origins = ["http://localhost:3000"];

  if (process.env.NODE_ENV === "production") {
    if (process.env.DOMAIN !== undefined) {
      origins.push(`https://www.${process.env.DOMAIN}`);
    }
  }

  // config
  app.enableCors({
    credentials: true,
    origin: origins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  });
  await app.register(FastifyCookie);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 9000);
}

void bootstrap();

/*
  Comments:
  We use NestJS with Fastify but use Express types for convenience.
*/
