import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// root file -> entry point of the application

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global settings
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that don't have decorators
      forbidNonWhitelisted: true, // throws error if there are properties that don't have decorators
      transform: true, // automatically transforms payload to object type according to their dto class
      disableErrorMessages: false, // disable error messages
    }),
  );
  // env config ...

  // start a http server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
