import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { API_URL } from 'src/common/constants/routes.constants';
import { ApiTags } from '@nestjs/swagger';
import { CapacitacionService } from './services/capacitacion.service';
import { TestCreateDTO } from './models/dto';

@Controller(`${API_URL}/capacitaciones`)
@ApiTags('Capacitación')
export class CapacitacionController {
  constructor(private _capService: CapacitacionService) {}

  @Get('/')
  public async getAll() {
    return 'Yah baby';
    /* const registros = await this._capService.getAll();
    if (registros) return registros;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    ); */
  }

  @Post('')
  public async createOne(@Body() testDTO: TestCreateDTO) {
    return 'Yeah baby';
    /* const test = await this._capService.createOne(testDTO);
    if (test) return test;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    ); */
  }
}
