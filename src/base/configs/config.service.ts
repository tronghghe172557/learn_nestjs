import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config({
  path: ['.env.local', '.env'],
});

@Injectable()
export class ConfigService {
  NODE_ENV = process.env['NODE_ENV'] || 'development';
  APP_PORT = parseInt(process.env['APP_PORT'] ?? '3000');
  USE_HTTPS = process.env['USE_HTTPS'] === 'true';

  ACCESS_SECRET_KEY = process.env['ACCESS_SECRET_KEY'] ?? 'access_secret_key';
  REFRESH_SECRET_KEY = process.env['REFRESH_SECRET_KEY'] ?? 'refresh_secret_key';

  DB_HOST = process.env['DB_HOST'] ?? 'localhost';
  DB_PORT = process.env['DB_PORT'] ?? '27017';
  DB_DATABASE_NAME = process.env['DB_DATABASE_NAME'];

  MONGO_URI = `mongodb://${this.DB_HOST}:${this.DB_PORT}/${this.DB_DATABASE_NAME}`;

  REDIS = {
    host: process.env['REDIS_HOST'] ?? 'localhost',
    port: parseInt(process.env['REDIS_PORT'] ?? '6379'),
    username: process.env['REDIS_USERNAME'] ?? '',
    password: process.env['REDIS_PASSWORD'] ?? '',
  };
}

export const configs = new ConfigService();
