import { IsOptional } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { PartialType } from '@nestjs/mapped-types';

// export class UpdatePostDto {
//   @IsOptional()
//   @IsString()
//   @MinLength(1)
//   @MaxLength(255)
//   title?: string;

//   @IsOptional()
//   @IsString()
//   @MinLength(1)
//   @MaxLength(255)
//   content?: string;
// }

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;
}
