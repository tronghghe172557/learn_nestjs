import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

// express ->
// server.js -> routes, controllers, services
// route A -> controller A -> service A

// nestjs -> incoming request and returning responses
// get post put delete

// localhost:3000/hello -> controller -> service

// ('hello') hello is entry point
@Controller('hello')
export class HelloController {
  // dependency injection -> di
  constructor(private readonly helloService: HelloService) {} // inject service to controller

  @Get() // http get request
  // @Get('hello') -> localhost:3000/hello/hello
  getHello(): string {
    return this.helloService.getHello(); // call service method
  }

  @Get('more-slash') // http get request
  // @Get('more-slash') -> localhost:3000/hello/more-slash
  getHelloAddMoreSlash(): string {
    return this.helloService.getHelloAddMoreSlash(); // call service method
  }

  @Get('user/:name') // :name is a route parameter -> dynamic param
  // @Get('user/:name') -> localhost:3000/hello/user/your-name
  getHelloUserName(@Param('name') name: string): string {
    return this.helloService.getHelloWithName(name); // call service method
  }

  @Get('query') // query param
  // @Get('query') -> localhost:3000/hello/query?name=your-name
  getHelloWithQuery(@Query('name') name: string): string {
    return this.helloService.getHelloWithName(name || 'world'); // call service method
  }
}
