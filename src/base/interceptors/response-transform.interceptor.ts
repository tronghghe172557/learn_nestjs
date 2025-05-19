import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';


// interceptor: giống như 1 người đứng giữa để biến đổi request ( nhận được từ người dùng ) hay trả response ( trả về cho người dùng )
@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
    // interceptor: là nơi xử lý request và response
    // context: chứa thông tin về request, response, ...
    // next: là handler tiếp theo trong chuỗi xử lý request
    // observable: là nơi xử lý request và response
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // next.handle(): cho phép tiếp tục xử lý request -> dẫn nó đến controller
    // pipe: biến đổi dữ liệu trả về từ controller
    // map: biến đổi dữ liệu trả về từ controller
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        const statusCode = response.statusCode;

        if (!data) return data;

        if (Array.isArray(data.data) && 'metadata' in data) {
          return {
            ...data,
            statusCode,
          };
        }

        return {
          data: data,
          statusCode,
        };
      }),
    );
  }
}
