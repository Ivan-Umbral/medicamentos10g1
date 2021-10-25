import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { API_URL } from 'src/common/constants/routes.constants';
import { UsuarioService } from './services/usuario.service';
import { UsuarioCreateDTO } from './models/dto/usuario.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller(`${API_URL}/usuarios`)
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private _usuarioService: UsuarioService) {}

  @Post('')
  public async createOne(@Res() res: Response, @Body() body: UsuarioCreateDTO) {
    const olv = await this._usuarioService.createOne(body);
    return res.json({ olv: 'olv', body });
  }
}
