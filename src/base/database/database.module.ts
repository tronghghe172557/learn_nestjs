import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { configs } from '@/base/configs';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(configs.MONGO_URI, {
      retryAttempts: 10, // retry 10 times
      retryDelay: 1000, // retry every 1 second
      timeoutMS: 10000, // timeout after 10 seconds
      serverSelectionTimeoutMS: 10000, // is the time to wait for a server to be selected
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
