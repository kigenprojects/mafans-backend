import { IsString, IsNumber, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly first_name: string

  @IsString()
  readonly last_name: string

  @IsString()
  readonly username: string

  @IsNumber()
  readonly phone_number: number

  @IsEmail()
  readonly email: string

  @IsString()
  readonly password: string

  @IsBoolean()
  readonly isActive: boolean

  @IsBoolean()
  readonly isVerified: boolean
}



export class LoginDTO {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}