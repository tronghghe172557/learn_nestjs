import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getHello(): string {
    return 'Hello World NestJs!';
  }

  getHelloAddMoreSlash(): string {
    return 'Hello Slash NestJs!';
  }

  getHelloWithName(name: string): string {
    return `Hello ${name} NestJs!`;
  }
}
