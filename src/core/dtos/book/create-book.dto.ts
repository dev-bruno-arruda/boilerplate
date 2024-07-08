import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsNumber()
  @IsNotEmpty()
  genreId: number;

  @IsDate()
  publishDate: Date;
}
