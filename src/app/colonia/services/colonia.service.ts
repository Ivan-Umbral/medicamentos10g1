import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colonia } from '../../../data/entities/colonia.entity';
import { Repository, Like } from 'typeorm';
import { MapperService } from '../../../common/mapper/services/mapper.service';
import { ColoniaReadDTO } from '../models/dto';

@Injectable()
export class ColoniaService {
  constructor(
    @InjectRepository(Colonia) private _coloniaRepository: Repository<Colonia>,
    private _mapper: MapperService,
  ) {}

  public async getColoniasByMunicipioId(
    municipioId: number,
  ): Promise<ColoniaReadDTO[]> {
    const colonias = await this._coloniaRepository.find({
      where: { municipio: municipioId },
    });
    if (colonias) {
      const coloniasDTO = this._mapper.toArrayDTO<ColoniaReadDTO>(
        colonias,
        ColoniaReadDTO,
      );
      return coloniasDTO;
    }
    return null;
  }

  public async getAllByMunicipioIdAndName(
    municipioId: number,
    coloniaName: string,
  ): Promise<ColoniaReadDTO[]> {
    const colonias = await this._coloniaRepository.find({
      where: { municipio: municipioId, nombre: Like(`%${coloniaName}%`) },
      take: 10,
    });
    if (colonias) {
      const coloniasDTO = this._mapper.toArrayDTO<ColoniaReadDTO>(
        colonias,
        ColoniaReadDTO,
      );
      return coloniasDTO;
    }
    return null;
  }
}
