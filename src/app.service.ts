import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const appName = this.configService.get<string>('appName');
    console.log(`APP_NAME: ${appName}`);
    return `Hello World! ${appName}`;
  }
}
