import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../../../data/entities/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioCreateDTO } from '../models/dto/usuario.dto';
import { RoleEnum } from 'src/data/enums/role.enum';
import { hashSync } from 'bcrypt';
import { Role } from 'src/data/entities/role.entity';
import {
  getEstadoRealtionIdObject,
  getColoniaRealtionIdObject,
  getMunicipioRealtionIdObject,
} from 'src/common/helpers';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private _usuarioRepository: Repository<Usuario>,
  ) {}

  public async createOne(user: UsuarioCreateDTO): Promise<boolean> {
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
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
