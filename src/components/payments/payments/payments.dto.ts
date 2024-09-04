import { IsString } from 'class-validator';



export class PaymentsDTO {
  @IsString()
  fan_phone_number: number;

  @IsString()
  fan_message: string;

  @IsString()
  fan_name: string;

  @IsString()
  fan_amount: number;

  @IsString()
  owner_slug: string

  @IsString()
  user: string
}