import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;

  phone?: string;
  cccd?: string;
  address?: string;

  role?: 'admin' | 'user';
}
