import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCollateralDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
