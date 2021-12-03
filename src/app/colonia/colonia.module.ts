import { Module } from '@nestjs/common';
import { ColoniaController } from './colonia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colonia } from '../../data/entities/colonia.entity';
import { ColoniaService } from './services/colonia.service';

@Module({
  controllers: [ColoniaController],
  imports: [TypeOrmModule.forFeature([Colonia])],
  providers: [ColoniaService],
})
export class ColoniaModule {}
