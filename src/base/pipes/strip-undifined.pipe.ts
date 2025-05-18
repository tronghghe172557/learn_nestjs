import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

// loại bỏ các trường undefined trong object
@Injectable()
export class StripUndefinedPipe implements PipeTransform {
  // transform method is called before the route handler to custom the input data
  transform(value: any, _: ArgumentMetadata) {
    return instanceToPlain(value, { exposeUnsetFields: false });
  }
}
