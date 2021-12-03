import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { API_URL } from 'src/common/constants/routes.constants';
import { PerfilService } from './services/perfil.service';
import { ApiTags } from '@nestjs/swagger';

@Controller(`${API_URL}/perfiles`)
@ApiTags('Perfiles')
export class PerfilController {
  constructor(private _perfilService: PerfilService) {}

  @Get('/username/:username')
  public async usernameExists(@Param('username') username: string) {
    const userExists = await this._perfilService.usernameExists(username);
    if (userExists) return userExists;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('/email/:email')
  public async emailExists(@Param('email') email: string) {
    const userExists = await this._perfilService.emailExists(email);
    if (userExists) return userExists;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
