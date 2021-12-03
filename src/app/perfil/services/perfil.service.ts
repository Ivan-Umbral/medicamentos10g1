import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from '../../../data/entities/perfil.entity';
import { Repository, UpdateResult } from 'typeorm';
import { RefreshTokenRequestDTO } from 'src/app/auth/models/dto';
import {
  IUsernameExistsDTO,
  ICorreoExistsDTO,
} from '../models/interfaces/perfil.interface';

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

  public async usernameExists(username: string): Promise<IUsernameExistsDTO> {
    try {
      const perfil = await this._perfilRepository.findOne({
        where: { username },
      });
      if (perfil) {
        return { usernameExists: true };
      }
      return { usernameExists: false };
    } catch (error) {
      return null;
    }
  }

  public async emailExists(email: string): Promise<ICorreoExistsDTO> {
    try {
      const perfil = await this._perfilRepository.findOne({
        where: { correoElectronico: email },
      });
      if (perfil) {
        return { correoExists: true };
      }
      return { correoExists: false };
    } catch (error) {
      return null;
    }
  }
}
