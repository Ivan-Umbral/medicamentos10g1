import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pais } from '../../../data/entities/pais.entity';
import { PaisReadDTO } from '../models/dto/pais.read.dto';
import { MapperService } from '../../../common/mapper/services/mapper.service';
import { PaisCreateDTO } from '../models/dto/pais.create.dto';
import { PaisEditDTO } from '../models/dto/pais.edit.dto';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pais) private _paisRepository: Repository<Pais>,
    private _mapper: MapperService,
  ) {}

  public async getPaises(): Promise<PaisReadDTO[]> {
    const paisesDB = await this._paisRepository.find();
    if (paisesDB) {
      const paisesDTO = this._mapper.toArrayDTO<PaisReadDTO>(
        paisesDB,
        PaisReadDTO,
      );
      return paisesDTO;
    }
    return null;
  }

  public async getOne(id: number): Promise<PaisReadDTO> {
    const paisDB = await this._paisRepository.findOne({ id });
    if (paisDB) return this._mapper.toDTO<PaisReadDTO>(paisDB, PaisReadDTO);
    return null;
  }

  public async createOne(pais: PaisCreateDTO): Promise<PaisReadDTO> {
    try {
      const paisEntity = this._paisRepository.create(pais);
      const paisDB = await this._paisRepository.save(paisEntity);
      if (paisDB) return this._mapper.toDTO<PaisReadDTO>(paisDB, PaisReadDTO);
      return null;
    } catch (error) {
      return null;
    }
  }

  public async updateOne(pais: PaisEditDTO, id: number): Promise<PaisEditDTO> {
    const paisDB = await this.getOne(id);
    if (paisDB) {
      const paisUpdated = await this._paisRepository.update(paisDB.id, pais);
      return paisUpdated.affected > 0 ? pais : null;
    }
    return null;
  }

  public async deleteOne(id: number): Promise<number> {
    const paisDB = await this.getOne(id);
    if (paisDB) {
      const deleted = await this._paisRepository.delete(id);
      return deleted.affected > 0 ? id : 0;
    }
    return -1;
  }
}
