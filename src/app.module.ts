import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './base/database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTransformInterceptor } from './base/interceptors';

@Module({
  imports: [
    ConfigModule,
    HelloModule,
    UserModule,
    PostsModule,
    ConfigModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
})
export class AppModule {}
