import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import { configs } from '@/base/configs';
import { StripUndefinedPipe } from '@/base/pipes';

// root file -> entry point of the application

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // global settings

  // set global prefix
  app.setGlobalPrefix('api/v1');
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: ['1'],
  // });

  app.enableCors();

  // set validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that don't have decorators
      forbidNonWhitelisted: true, // throws error if there are properties that don't have decorators
      transform: true, // automatically transforms payload to object type according to their dto class
      disableErrorMessages: false, // disable error messages
    }),

    new StripUndefinedPipe(), // custom pipe to strip undefined properties
  );

  await app.listen(configs.APP_PORT, () => {
    logger.log(`Current environment: ${configs.NODE_ENV}`);
    logger.log(`Server is running on port ${configs.APP_PORT}`);
    if (configs.NODE_ENV === 'development') {
      const protocol = configs.USE_HTTPS ? 'https' : 'http';
      logger.log(`API: ${protocol}://localhost:${configs.APP_PORT}/api/v1`);
    }
  });
}
bootstrap();
