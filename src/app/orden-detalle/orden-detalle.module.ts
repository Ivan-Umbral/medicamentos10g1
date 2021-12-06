import { Module } from '@nestjs/common';
import { OrdenDetalleController } from './orden-detalle.controller';
import { OrdenDetalleService } from './services/orden-detalle.service';

@Module({
  controllers: [OrdenDetalleController],
  providers: [OrdenDetalleService],
})
export class OrdenDetalleModule {}
