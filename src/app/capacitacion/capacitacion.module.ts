import { Module } from '@nestjs/common';
import { CapacitacionController } from './capacitacion.controller';
import { CapacitacionService } from './services/capacitacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '../../data/entities/test.entity';

@Module({
  controllers: [CapacitacionController],
  providers: [CapacitacionService],
  imports: [TypeOrmModule.forFeature([Test])],
})
export class CapacitacionModule {}
