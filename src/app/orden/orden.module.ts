import { Module } from '@nestjs/common';
import { OrdenController } from './orden.controller';
import { OrdenService } from './services/orden.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from '../../data/entities/orden.entity';
import { PagoModule } from '../pago/pago.module';

@Module({
  controllers: [OrdenController],
  providers: [OrdenService],
  imports: [TypeOrmModule.forFeature([Orden]), PagoModule],
})
export class OrdenModule {}
