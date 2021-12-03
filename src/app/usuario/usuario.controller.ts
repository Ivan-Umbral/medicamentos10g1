import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  HttpStatus,
  Delete,
  Param,
  ParseIntPipe,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { API_URL } from '../../common/constants/routes.constants';
import { UsuarioService } from './services/usuario.service';
import {
  UsuarioCreateDTO,
  UsuarioMovilCreateDTO,
} from './models/dto/usuario.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RoleEnum } from '../../data/enums/role.enum';
import { Roles } from '../../common/decotators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller(`${API_URL}/usuarios`)
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private _usuarioService: UsuarioService) {}

  @Post('')
  public async createOne(@Body() body: UsuarioCreateDTO) {
    const response = await this._usuarioService.createOne(body);
    if (response) {
      return response;
    }
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  /* @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN, RoleEnum.USUARIO)
  @UseGuards(JwtAuthGuard, RoleGuard) */
  @Post('/movil')
  public async createOneMovil(@Body() body: UsuarioMovilCreateDTO) {
    const response = await this._usuarioService.createOneMovil(body);
    if (response) return response;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Delete(':id')
  public async deleteOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const deleted = await this._usuarioService.deleteOne(id);
    if (deleted) {
      return res.status(HttpStatus.OK).json({
        ok: true,
        message: 'User Deleted',
      });
    }
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
