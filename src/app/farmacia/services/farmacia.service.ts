import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmacia } from '../../../data/entities/farmacia.entity';
import { Repository, getConnection } from 'typeorm';
import { FarmaciaCreateDTO } from '../models/dto';
import { AuthLoginResponseDTO } from 'src/app/auth/models/dto';
import { MapperService } from '../../../common/mapper/services/mapper.service';
import { Role } from '../../../data/entities/role.entity';
import { RoleEnum } from '../../../data/enums/role.enum';
import { hashSync } from 'bcrypt';
import { AuthService } from '../../auth/services/auth.service';
import { PerfilAuthPayload } from '../../perfil/models/dto/perfil.dto';
import { Direccion } from '../../../data/entities/direccion.entity';
import { Perfil } from '../../../data/entities/perfil.entity';
import { FarmaciaReadDTO } from '../models/dto';
import {
  getEstadoRealtionIdObject,
  getColoniaRealtionIdObject,
  getMunicipioRealtionIdObject,
} from '../../../common/helpers/relation-entity.helper';

@Injectable()
export class FarmaciaService {
  constructor(
    @InjectRepository(Farmacia)
    private _farmaciaRepository: Repository<Farmacia>,
    private _mapper: MapperService,
    private _authService: AuthService,
  ) {}

  public async getOne(id: number): Promise<FarmaciaReadDTO> {
    const farmacia = await this._farmaciaRepository.findOne(id);
    if (farmacia) {
      const farmaciaDTO = this._mapper.toDTO<FarmaciaReadDTO>(
        farmacia,
        FarmaciaReadDTO,
      );
      return farmaciaDTO;
    }
    return null;
  }

  public async createOne(
    farmacia: FarmaciaCreateDTO,
  ): Promise<AuthLoginResponseDTO> {
    try {
      const farmaciaEntity = this._farmaciaRepository.create(farmacia);
      const role = new Role();
      role.id = RoleEnum.FARMACIA;
      farmaciaEntity.perfil.rol = role;
      farmaciaEntity.direccion.estado = getEstadoRealtionIdObject(
        farmacia.direccion.estadoId,
      );
      farmaciaEntity.direccion.municipio = getMunicipioRealtionIdObject(
        farmacia.direccion.municipioId,
      );
      farmaciaEntity.direccion.colonia = getColoniaRealtionIdObject(
        farmacia.direccion.coloniaId,
      );
      farmaciaEntity.perfil.contrasena = hashSync(
        farmaciaEntity.perfil.contrasena,
        10,
      );
      const farmaciaDB = await this._farmaciaRepository.save(farmaciaEntity);
      if (farmaciaDB) {
        const response = await this._authService.login(
          this.createPerfilAuthPayload(farmaciaDB),
        );
        return response;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  public async deleteOne(id: number): Promise<boolean> {
    const farmaciaExists = await this.farmaciaExists(id);
    if (!farmaciaExists) return false;
    const usuario = await this._farmaciaRepository.findOne(id);
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const farmaciaDeleted = await queryRunner.manager.delete(Farmacia, id);
      const direccionDeleted = await queryRunner.manager.delete(
        Direccion,
        usuario.direccion.id,
      );
      const perfilDeleted = await queryRunner.manager.delete(
        Perfil,
        usuario.perfil.id,
      );
      if (
        farmaciaDeleted.affected > 0 &&
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

  public async farmaciaExists(id: number): Promise<boolean> {
    try {
      const user = await this._farmaciaRepository.findOneOrFail({
        where: { id },
      });
      return user ? true : false;
    } catch (error) {
      return false;
    }
  }

  private createPerfilAuthPayload(farmaciaDB: Farmacia): PerfilAuthPayload {
    const perfilPayload: PerfilAuthPayload = {
      id: farmaciaDB.perfil.id,
      ownerId: farmaciaDB.id,
      rolId: farmaciaDB.perfil.rol.id,
      correoElectronico: farmaciaDB.perfil.correoElectronico,
      refreshToken: farmaciaDB.perfil.refreshToken,
      username: farmaciaDB.perfil.username,
    };
    return perfilPayload;
  }
}
