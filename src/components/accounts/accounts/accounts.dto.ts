import { IsString, IsNumber, IsEmail, IsBoolean } from 'class-validator';

export class AccountsDTO {
  // @IsString()
  // readonly balance: string;

  @IsString()
  readonly amounts: number[];

  @IsString()
  readonly paymentName: string;

  @IsNumber()
  readonly slogan: string;

  @IsEmail()
  readonly description: string;

  @IsString()
  readonly message: string;

  @IsBoolean()
  readonly user: any;
}

