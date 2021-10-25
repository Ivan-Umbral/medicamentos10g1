import { Module } from '@nestjs/common';
import { PerfilService } from './services/perfil.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfil } from '../../data/entities/perfil.entity';

@Module({
  providers: [PerfilService],
  imports: [TypeOrmModule.forFeature([Perfil])],
  exports: [PerfilService],
})
export class PerfilModule {}
