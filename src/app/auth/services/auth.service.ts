import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { PerfilService } from '../../perfil/services/perfil.service';
import { MapperService } from '../../../common/mapper/services/mapper.service';
import {
  PerfilAuthReadDTO,
  PerfilAuthPayload,
} from '../../perfil/models/dto/perfil.dto';
import { FarmaciaAuthReadDTO } from '../../farmacia/models/dto/farmacia.dto';
import { RepartidorAuthReadDTO } from '../../repartidor/models/dto/repartidor.dto';
import { UsuarioAuthReadDTO } from '../../usuario/models/dto/usuario.dto';
import { JwtService } from '@nestjs/jwt';
import {
  AuthLoginResponseDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
} from '../models/dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private _perfilService: PerfilService,
    private _mapper: MapperService,
    private _jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<PerfilAuthPayload> {
    const user = await this._perfilService.findOneAuth(username);
    if (user && compareSync(pass, user.contrasena)) {
      const userDTO = this._mapper.toDTO<PerfilAuthReadDTO>(
        user,
        PerfilAuthReadDTO,
      );
      return this.getUserPayload(userDTO);
    }
    return null;
  }

  public async login(user: PerfilAuthPayload): Promise<AuthLoginResponseDTO> {
    const loginResponse: AuthLoginResponseDTO = {
      accesToken: this._jwtService.sign(user),
      id: user.ownerId,
      correoElectronico: user.correoElectronico,
      username: user.username,
      refreshToken: user.refreshToken,
    };
    return loginResponse;
  }

  public async refreshToken(
    refresTokenObj: RefreshTokenRequestDTO,
  ): Promise<RefreshTokenResponseDTO> {
    const perfil = await this._perfilService.findOneRefreshToken(
      refresTokenObj,
    );
    if (perfil) {
      const perfilDTO = this._mapper.toDTO<PerfilAuthReadDTO>(
        perfil,
        PerfilAuthReadDTO,
      );
      const jwtPayload = this.getUserPayload(perfilDTO);
      jwtPayload.refreshToken = uuidv4();
      const refreshTokeUpdate = await this._perfilService.refreshToken(
        jwtPayload.id,
        jwtPayload.refreshToken,
      );
      return refreshTokeUpdate.affected > 0
        ? {
            accessToken: this._jwtService.sign(jwtPayload),
            refreshToken: jwtPayload.refreshToken,
          }
        : null;
    }
    return null;
  }

  private getUserPayload(userDTO: PerfilAuthReadDTO): PerfilAuthPayload {
    const { farmacia, repartidor, usuario, ...rest } = userDTO;
    const userPayload: PerfilAuthPayload = {
      id: rest.id,
      correoElectronico: rest.correoElectronico,
      username: rest.username,
      refreshToken: rest.refreshToken,
      rolId: rest.rol.id,
      ownerId: this.getOwnerId(farmacia, repartidor, usuario),
    };
    return userPayload;
  }

  private getOwnerId(
    farmacia: FarmaciaAuthReadDTO,
    repartidor: RepartidorAuthReadDTO,
    usuario: UsuarioAuthReadDTO,
  ): number {
    if (farmacia) return farmacia.id;
    else if (repartidor) return repartidor.id;
    return usuario.id;
  }
}
