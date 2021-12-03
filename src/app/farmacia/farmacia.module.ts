import { Module } from '@nestjs/common';
import { FarmaciaController } from './farmacia.controller';
import { FarmaciaService } from './services/farmacia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmacia } from '../../data/entities/farmacia.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FarmaciaController],
  providers: [FarmaciaService],
  imports: [TypeOrmModule.forFeature([Farmacia]), AuthModule],
})
export class FarmaciaModule {}
