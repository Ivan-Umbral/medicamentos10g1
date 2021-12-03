import { Module } from '@nestjs/common';
import { MunicipioController } from './municipio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from '../../data/entities/municipio.entity';
import { MunicipioService } from './services/municipio.service';

@Module({
  controllers: [MunicipioController],
  imports: [TypeOrmModule.forFeature([Municipio])],
  providers: [MunicipioService],
})
export class MunicipioModule {}
