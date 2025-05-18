// zod-validation.pipe.ts
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType, ZodTypeDef } from 'zod';

@Injectable()
export class ZodValidationPipe<TInput = unknown> implements PipeTransform {
  constructor(private schema: ZodType<TInput, ZodTypeDef, unknown>) {}

  transform(value: unknown): TInput {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const formattedErrors = result.error.errors.map(
        (e) => `${e.path.join('.')}: ${e.message}`,
      );
      throw new BadRequestException(formattedErrors);
    }

    return result.data;
  }
}
