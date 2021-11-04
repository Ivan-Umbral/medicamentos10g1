import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../../../data/entities/usuario.entity';
import { getConnection, Repository } from 'typeorm';
import { UsuarioCreateDTO } from '../models/dto/usuario.dto';
import { RoleEnum } from 'src/data/enums/role.enum';
import { hashSync } from 'bcrypt';
import { Role } from 'src/data/entities/role.entity';
import {
  getEstadoRealtionIdObject,
  getColoniaRealtionIdObject,
  getMunicipioRealtionIdObject,
} from 'src/common/helpers';
import { AuthLoginResponseDTO } from 'src/app/auth/models/dto';
import { AuthService } from '../../auth/services/auth.service';
import { PerfilAuthPayload } from '../../perfil/models/dto/perfil.dto';
import { Direccion } from '../../../data/entities/direccion.entity';
import { Perfil } from '../../../data/entities/perfil.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private _usuarioRepository: Repository<Usuario>,
    private _authService: AuthService,
  ) {}

  public async createOne(
    user: UsuarioCreateDTO,
  ): Promise<AuthLoginResponseDTO> {
    try {
      const userEntity = this._usuarioRepository.create(user);
      const role = new Role();
      role.id = RoleEnum.USUARIO;
      userEntity.perfil.rol = role;
      userEntity.direccion.estado = getEstadoRealtionIdObject(
        user.direccion.estadoId,
      );
      userEntity.direccion.municipio = getMunicipioRealtionIdObject(
        user.direccion.municipioId,
      );
      userEntity.direccion.colonia = getColoniaRealtionIdObject(
        user.direccion.coloniaId,
      );
      userEntity.perfil.contrasena = hashSync(userEntity.perfil.contrasena, 10);
      const userDB = await this._usuarioRepository.save(userEntity);
      const response = await this._authService.login(
        this.createPerfilAuthPayload(userDB),
      );
      return response;
    } catch (error) {
      return null;
    }
  }

  public async deleteOne(id: number): Promise<boolean> {
    const userExists = await this.userExists(id);
    if (!userExists) return false;
    const usuario = await this._usuarioRepository.findOne(id);
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userDeleted = await queryRunner.manager.delete(Usuario, id);
      const direccionDeleted = await queryRunner.manager.delete(
        Direccion,
        usuario.direccion.id,
      );
      const perfilDeleted = await queryRunner.manager.delete(
        Perfil,
        usuario.perfil.id,
      );
      if (
        userDeleted.affected > 0 &&
        direccionDeleted.affected > 0 &&
        perfilDeleted.affected > 0
      ) {
        await queryRunner.commitTransaction();
        return true;
      }
      await queryRunner.rollbackTransaction();
      return false;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  public async userExists(id: number): Promise<boolean> {
    try {
      const user = await this._usuarioRepository.findOneOrFail({
        where: { id },
      });
      return user ? true : false;
    } catch (error) {
      return false;
    }
  }

  private createPerfilAuthPayload(userDB: Usuario): PerfilAuthPayload {
    const perfilPayload: PerfilAuthPayload = {
      id: userDB.perfil.id,
      ownerId: userDB.id,
      rolId: userDB.perfil.rol.id,
      correoElectronico: userDB.perfil.correoElectronico,
      refreshToken: userDB.perfil.refreshToken,
      username: userDB.perfil.username,
    };
    return perfilPayload;
  }
}
