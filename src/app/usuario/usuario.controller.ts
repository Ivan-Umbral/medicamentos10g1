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
} from '@nestjs/common';
import { Response } from 'express';
import { API_URL } from '../../common/constants/routes.constants';
import { UsuarioService } from './services/usuario.service';
import { UsuarioCreateDTO } from './models/dto/usuario.dto';
import { ApiTags } from '@nestjs/swagger';

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
