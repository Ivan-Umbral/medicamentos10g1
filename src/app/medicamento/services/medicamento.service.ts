import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicamento } from '../../../data/entities/medicamento.entity';
import { MoreThan, Repository } from 'typeorm';
import { MedicamentoReadDTO } from '../models/dto';
import { MapperService } from '../../../common/mapper/services/mapper.service';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private _medicamentoRepository: Repository<Medicamento>,
    private _mapper: MapperService,
  ) {}

  public async getMedicamentos(): Promise<MedicamentoReadDTO[]> {
    const medicamentos = await this._medicamentoRepository.find();
    if (medicamentos) {
      const medicamentosDTO = this._mapper.toArrayDTO<MedicamentoReadDTO>(
        medicamentos,
        MedicamentoReadDTO,
      );
      return medicamentosDTO;
    }
    return null;
  }

  public async getPaginatedMedicamentos(
    take = 5,
    skip = 0,
  ): Promise<MedicamentoReadDTO[]> {
    const medicamentos = await this._medicamentoRepository.find({
      take,
      skip,
      where: { stock: MoreThan(0) },
    });
    if (medicamentos) {
      const medicamentosDTO = this._mapper.toArrayDTO<MedicamentoReadDTO>(
        medicamentos,
        MedicamentoReadDTO,
      );
      return medicamentosDTO;
    }
    return null;
  }

  public async getOne(id: number): Promise<MedicamentoReadDTO> {
    try {
      const medicamentoDB = await this._medicamentoRepository.findOne(id);
      if (medicamentoDB) {
        const medicamento = this._mapper.toDTO<MedicamentoReadDTO>(
          medicamentoDB,
          MedicamentoReadDTO,
        );
        return medicamento;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  public async restarStock(id: number, cantidad: number): Promise<boolean> {
    const medicamento = await this._medicamentoRepository.findOne(id);
    const stock = medicamento.stock - cantidad;
    const updaed = await this._medicamentoRepository.update(id, { stock });
    return updaed.affected > 0;
  }
}
