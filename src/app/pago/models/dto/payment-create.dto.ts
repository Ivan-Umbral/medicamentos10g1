import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaymentCreateDTO {
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  token: string;
}
