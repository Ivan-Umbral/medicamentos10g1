import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { API_URL } from 'src/common/constants/routes.constants';
import { EstadoService } from './services/estado.service';

@Controller(`${API_URL}/estados`)
@ApiTags('Estados')
export class EstadoController {
  constructor(private _estadoService: EstadoService) {}

  @Get('')
  public async getEstados(@Res() res: Response) {
    const estados = await this._estadoService.getEstados();
    if (estados) {
      return res.status(HttpStatus.OK).json({
        estados,
      });
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Somethiing went wrong.',
    });
  }
}
