import { Module } from '@nestjs/common';
import { PaisController } from './pais.controller';
import { PaisService } from './services/pais.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from '../../data/entities/pais.entity';

@Module({
  controllers: [PaisController],
  providers: [PaisService],
  imports: [TypeOrmModule.forFeature([Pais])],
})
export class PaisModule {}
