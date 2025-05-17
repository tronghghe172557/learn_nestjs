import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// root file -> entry point of the application

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global settings
  // env config ...

  // start a http server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
