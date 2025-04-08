import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { NestFactory } from "@nestjs/core";
import FastifyCookie from "@fastify/cookie";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
  );

  // config
  app.enableCors({
    credentials: true,
    origin: process.env.WEB_URL,
  });
  await app.register(FastifyCookie);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 9000);
}

void bootstrap();
