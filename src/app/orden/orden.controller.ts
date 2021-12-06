import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
