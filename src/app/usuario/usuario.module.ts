import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../data/entities/usuario.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UsuarioService],
  controllers: [UsuarioController],
  imports: [TypeOrmModule.forFeature([Usuario]), AuthModule],
})
export class UsuarioModule {}
