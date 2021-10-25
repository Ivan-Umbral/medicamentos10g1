import {
  Controller,
  Request,
  UseGuards,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_URL } from 'src/common/constants/routes.constants';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './services/auth.service';
import { AuthLoginDTO } from './models/dto/auth-login.dto';
import {
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
} from './models/dto/auth-refresh-token.dto';

@Controller(`${API_URL}/auth`)
@ApiTags('Auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDTO: AuthLoginDTO) {
    const loginResponse = await this._authService.login(req.user);
    return loginResponse;
  }

  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenObj: RefreshTokenRequestDTO,
  ): Promise<RefreshTokenResponseDTO> {
    const refreshToken = await this._authService.refreshToken(refreshTokenObj);
    if (refreshToken) {
      return {
        accessToken: refreshToken.accessToken,
        refreshToken: refreshToken.refreshToken,
      };
    }
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
