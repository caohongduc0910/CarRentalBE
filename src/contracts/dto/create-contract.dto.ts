import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  carId: number;

  @IsNotEmpty()
  @IsNumber()
  collateralId: number;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsNumber()
  estimatedPrice: number;
}
