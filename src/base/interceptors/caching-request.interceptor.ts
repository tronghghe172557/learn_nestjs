import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { RedisService } from '@/base/database';

@Injectable()
export class CachingInterceptor implements NestInterceptor {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = this.generateKey(request);

    const cached = await this.redisClient.get(key);
    console.error(`Redis: Get key ${key} => ${cached}`);
    if (cached) {
        // of => Observable
      return of(JSON.parse(cached)); // Trả về cache
    }

    return next.handle().pipe(
      tap(async (response) => {
        await this.redisClient.set(key, JSON.stringify(response), 60); // Lưu cache
        // await this.redisClient.set(key, JSON.stringify(response), 'EX', 60); // TTL: 60s
      }),
    );
  }

  private generateKey(request: Request): string {
    const { method, originalUrl, query, body } = request;
    const queryString = JSON.stringify(query);
    const bodyString = JSON.stringify(body);
    return `${method}-${originalUrl}-${queryString}-${bodyString}`;
  }
}
