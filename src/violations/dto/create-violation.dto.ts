import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateViolationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
