import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { API_URL } from 'src/common/constants/routes.constants';
import { ApiTags } from '@nestjs/swagger';
import { ColoniaService } from './services/colonia.service';
import { ColoniaFilterDTO } from './models/dto';

@Controller(`${API_URL}/colonias`)
@ApiTags('Colonias')
export class ColoniaController {
  constructor(private _coloniaService: ColoniaService) {}

  @Get(':municipioId')
  public async getColoniasByMunicipioId(
    @Param('municipioId', ParseIntPipe) municipioId: number,
  ) {
    const colonias = await this._coloniaService.getColoniasByMunicipioId(
      municipioId,
    );
    if (colonias) return colonias;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post(':municipioId')
  public async getColoniasByMunicipioIdAndName(
    @Param('municipioId', ParseIntPipe) municipioId: number,
    @Body() colonia: ColoniaFilterDTO,
  ) {
    const colonias = await this._coloniaService.getAllByMunicipioIdAndName(
      municipioId,
      colonia.coloniaName,
    );
    if (colonias) return colonias;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
