import { IsNotEmpty } from 'class-validator';

export class AuthLoginDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
