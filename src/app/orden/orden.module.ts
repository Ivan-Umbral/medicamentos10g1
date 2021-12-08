import { Module } from '@nestjs/common';
import { OrdenController } from './orden.controller';
import { OrdenService } from './services/orden.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from '../../data/entities/orden.entity';
import { PagoModule } from '../pago/pago.module';
import { MedicamentoModule } from '../medicamento/medicamento.module';

@Module({
  controllers: [OrdenController],
  providers: [OrdenService],
  imports: [TypeOrmModule.forFeature([Orden]), PagoModule, MedicamentoModule],
})
export class OrdenModule {}
