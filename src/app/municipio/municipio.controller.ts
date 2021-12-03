import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_URL } from 'src/common/constants/routes.constants';
import { MunicipioService } from './services/municipio.service';
import { MunicipioFilterDTO } from './models/dto';

@Controller(`${API_URL}/municipios`)
@ApiTags('Municipios')
export class MunicipioController {
  constructor(private _municipioService: MunicipioService) {}

  @Get(':estadoId')
  public async getMunicipiosByEstadoId(
    @Param('estadoId', ParseIntPipe) estadoId: number,
  ) {
    const municipios = await this._municipioService.getAllByEstadoId(estadoId);
    if (municipios) return municipios;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post(':estadoId')
  public async getAllByEstadoIdAndName(
    @Param('estadoId', ParseIntPipe) estadoId: number,
    @Body() municipio: MunicipioFilterDTO,
  ) {
    const municipios = await this._municipioService.getAllByEstadoIdAndName(
      estadoId,
      municipio.municipioName,
    );
    if (municipios) return municipios;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
