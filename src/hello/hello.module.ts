import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
  controllers: [HelloController], // module can have multiple controllers
  providers: [HelloService], // module can have multiple service(providers) -> repository, etc
  imports: [], // module can import other modules if needed
  exports: [HelloService], // module can export service to be used in other modules
})
export class HelloModule {}
