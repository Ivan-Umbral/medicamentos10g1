import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { API_URL } from '../../common/constants/routes.constants';
import { EstadoService } from './services/estado.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../../common/decotators/role.decorator';
import { RoleEnum } from '../../data/enums/role.enum';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller(`${API_URL}/estados`)
@ApiTags('Estados')
@ApiBearerAuth()
export class EstadoController {
  constructor(private _estadoService: EstadoService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.USUARIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
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
