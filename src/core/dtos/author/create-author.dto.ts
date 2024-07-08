import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

}
