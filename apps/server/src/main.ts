import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { log } from "util";

async function bootstrap() {
  console.log(process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === "development") {
    app.enableCors();
  }
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.NEST_PORT ?? 3003);
}
bootstrap();
