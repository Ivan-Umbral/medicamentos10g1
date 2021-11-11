import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { API_URL } from 'src/common/constants/routes.constants';
import { ApiTags } from '@nestjs/swagger';
import { PaisService } from './services/pais.service';
import { PaisCreateDTO } from './models/dto/pais.create.dto';
import { PaisEditDTO } from './models/dto/pais.edit.dto';

@Controller(`${API_URL}/paises`)
@ApiTags('Paises')
export class PaisController {
  constructor(private _paisService: PaisService) {}

  @Get('/')
  public async getPaises() {
    const paises = await this._paisService.getPaises();
    if (paises) return paises;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    const paisDB = await this._paisService.getOne(id);
    if (paisDB) return paisDB;
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @Post('/')
  public async createOne(@Body() paisDTO: PaisCreateDTO) {
    const paisDB = await this._paisService.createOne(paisDTO);
    if (paisDB) return paisDB;
    throw new HttpException(
      'something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Put(':id')
  public async editOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() paisDTO: PaisEditDTO,
  ) {
    if (Object.keys(paisDTO).length === 0)
      throw new HttpException(
        'You must provide at least one property',
        HttpStatus.BAD_REQUEST,
      );
    const paisDB = await this._paisService.updateOne(paisDTO, id);
    if (paisDB) return paisDB;
    throw new HttpException(
      'something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Delete(':id')
  public async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this._paisService.deleteOne(id);
    if (deleted > 0) return { id: deleted };
    else if (deleted === 0)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
