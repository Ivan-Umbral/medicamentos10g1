import { Module } from '@nestjs/common';
import { EstadoController } from './estado.controller';
import { EstadoService } from './services/estado.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from '../../data/entities/estado.entity';

@Module({
  controllers: [EstadoController],
  providers: [EstadoService],
  imports: [TypeOrmModule.forFeature([Estado])],
})
export class EstadoModule {}
