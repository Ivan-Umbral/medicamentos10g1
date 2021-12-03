import { Module } from '@nestjs/common';
import { PerfilService } from './services/perfil.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfil } from '../../data/entities/perfil.entity';
import { PerfilController } from './perfil.controller';

@Module({
  providers: [PerfilService],
  imports: [TypeOrmModule.forFeature([Perfil])],
  exports: [PerfilService],
  controllers: [PerfilController],
})
export class PerfilModule {}
