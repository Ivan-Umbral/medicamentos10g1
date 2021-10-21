import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from '../../../data/entities/estado.entity';
import { MapperService } from '../../../common/mapper/services/mapper.service';
import { EstadoReadDTO } from '../models/dto/estado.dto';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(Estado) private _estadoRepository: Repository<Estado>,
    private _mapper: MapperService,
  ) {}

  public async getEstados(): Promise<EstadoReadDTO> {
    return this._estadoRepository
      .find()
      .then((estados) => {
        const estadosDTO = this._mapper.toArrayDTO<EstadoReadDTO>(
          estados,
          EstadoReadDTO,
        );
        return estadosDTO;
      })
      .catch(() => null);
  }
}
