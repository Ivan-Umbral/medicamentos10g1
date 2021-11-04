import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from '../../../data/entities/perfil.entity';
import { Repository, UpdateResult } from 'typeorm';
import { RefreshTokenRequestDTO } from 'src/app/auth/models/dto';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil) private _perfilRepository: Repository<Perfil>,
  ) {}

  public async findOneAuth(username: string): Promise<Perfil | undefined> {
    return this._perfilRepository.findOne({
      where: { username },
      relations: ['farmacias', 'repartidores', 'usuarios'],
    });
  }

  public async findOneRefreshToken(
    refresTokenObj: RefreshTokenRequestDTO,
  ): Promise<Perfil | undefined> {
    return this._perfilRepository.findOne({
      where: {
        username: refresTokenObj.username,
        refreshToken: refresTokenObj.refreshToken,
      },
      relations: ['farmacias', 'repartidores', 'usuarios'],
    });
  }

  public async refreshToken(
    id: number,
    refreshToken: string,
  ): Promise<UpdateResult> {
    return this._perfilRepository.update(id, { refreshToken });
  }
}
