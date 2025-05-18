import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreatePostDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MinLength(1, { message: 'Title must be at least 1 character long' })
  @MaxLength(255, { message: 'Title must be at most 255 characters long' })
  title: string;

  @IsNotEmpty({ message: 'content is required' })
  @IsString({ message: 'content must be a string' })
  @MinLength(1, { message: 'content must be at least 1 character long' })
  @MaxLength(255, { message: 'content must be at most 255 characters long' })
  content: string;
}
