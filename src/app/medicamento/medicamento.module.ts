import { Module } from '@nestjs/common';
import { MedicamentoController } from './medicamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicamento } from '../../data/entities/medicamento.entity';
import { MedicamentoService } from './services/medicamento.service';

@Module({
  controllers: [MedicamentoController],
  providers: [MedicamentoService],
  imports: [TypeOrmModule.forFeature([Medicamento])],
  exports: [MedicamentoService],
})
export class MedicamentoModule {}
