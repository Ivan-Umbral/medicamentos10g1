import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_URL } from 'src/common/constants/routes.constants';
import { OrdenService } from './services/orden.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrdenWDetalleCreateDTO } from './models/dto/orden-create.dto';

@ApiTags('Ordenes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller(`${API_URL}/ordenes`)
export class OrdenController {
  constructor(private _ordenService: OrdenService) {}

  @Get('all/:usuarioId')
  public async getOrdenesByUserId(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
  ) {
    const ordenes = await this._ordenService.getOrdenesByUserId(usuarioId);
    if (ordenes) return ordenes;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('farmacia/:farmaciaId')
  public async getOrdenesByFarmaciaId(
    @Param('farmaciaId', ParseIntPipe) farmaciaId: number,
  ) {
    const ordenes = await this._ordenService.getOrdenesByFarmaciaId(farmaciaId);
    if (ordenes) return ordenes;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('one/:usuarioId/:orderId')
  public async getOrdeneByUserId(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    const orden = await this._ordenService.getOrdenByUserId(usuarioId, orderId);
    if (orden) return orden;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post('stripe-orden')
  public async createOrden(@Body() ordenDTO: OrdenWDetalleCreateDTO) {
    const orden = await this._ordenService.createOrderWithDetail(ordenDTO);
    if (orden) return orden;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
