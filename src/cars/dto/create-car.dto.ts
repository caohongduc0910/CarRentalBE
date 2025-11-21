import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @IsNotEmpty()
  @IsInt()
  pricePerDay: number;
}
