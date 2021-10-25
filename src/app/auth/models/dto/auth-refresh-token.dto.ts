import { IsNotEmpty, IsUUID } from 'class-validator';

export class RefreshTokenRequestDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsUUID('4')
  refreshToken: string;
}

export class RefreshTokenResponseDTO {
  accessToken: string;
  refreshToken: string;
}
