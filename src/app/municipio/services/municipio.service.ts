import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipio } from '../../../data/entities/municipio.entity';
import { Like, Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/services/mapper.service';
import { MunicipioReadDTO } from '../models/dto';
import { Estado } from '../../../data/entities/estado.entity';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private _municipioRepository: Repository<Municipio>,
    private _mapper: MapperService,
  ) {}

  public async getAllByEstadoId(estadoId: number): Promise<MunicipioReadDTO[]> {
    const estado = new Estado();
    estado.id = estadoId;
    const municipios = await this._municipioRepository.find({
      where: { estado },
    });
    if (municipios) {
      const municipiosDTO = this._mapper.toArrayDTO<MunicipioReadDTO>(
        municipios,
        MunicipioReadDTO,
      );
      return municipiosDTO;
    }
    return null;
  }

  public async getAllByEstadoIdAndName(
    estadoId: number,
    municipioName: string,
  ): Promise<MunicipioReadDTO[]> {
    const estado = new Estado();
    estado.id = estadoId;
    const municipios = await this._municipioRepository.find({
      where: { estado, nombre: Like(`%${municipioName}%`) },
      take: 10,
    });
    if (municipios) {
      const municipiosDTO = this._mapper.toArrayDTO<MunicipioReadDTO>(
        municipios,
        MunicipioReadDTO,
      );
      return municipiosDTO;
    }
    return null;
  }
}
