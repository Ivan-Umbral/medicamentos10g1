import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicamento } from '../../../data/entities/medicamento.entity';
import { MoreThan, Repository } from 'typeorm';
import { MedicamentoReadDTO } from '../models/dto';
import { MapperService } from '../../../common/mapper/services/mapper.service';
import { MedicamentoFarmaciaReadDTO } from '../models/dto/medicamento-farmacia-read.dto';
import { Farmacia } from '../../../data/entities/farmacia.entity';
import { MedicamentoCreateDTO } from '../models/dto/medicamento-create.dto';
import * as cloudinary from 'cloudinary';
import { resolve } from 'path';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private _medicamentoRepository: Repository<Medicamento>,
    private _mapper: MapperService,
  ) {
    cloudinary.v2.config({
      cloud_name: 'dbttghvhv',
      api_key: '548749236864888',
      api_secret: 'wMTKf5glVFisw8JRnYFZCmGtSyY',
      secure: true,
    });
  }

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

  public async getMedicamentosByFarmaciaId(
    farmaciaId: number,
  ): Promise<MedicamentoFarmaciaReadDTO[]> {
    const farmacia = new Farmacia();
    farmacia.id = farmaciaId;
    const medicamentos = await this._medicamentoRepository.find({
      where: { farmacia },
    });
    if (medicamentos) {
      const medicamentosDTO =
        this._mapper.toArrayDTO<MedicamentoFarmaciaReadDTO>(
          medicamentos,
          MedicamentoFarmaciaReadDTO,
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
      where: { stock: MoreThan(1) },
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

  public async createOne(
    body: MedicamentoCreateDTO,
  ): Promise<MedicamentoFarmaciaReadDTO> {
    const medicamento = this._medicamentoRepository.create(body);
    const farmacia = new Farmacia();
    farmacia.id = body.farmaciaId;
    medicamento.farmacia = farmacia;
    const medDB = await this._medicamentoRepository.save(medicamento);
    if (medDB) {
      const medDTO = this._mapper.toDTO<MedicamentoFarmaciaReadDTO>(
        medDB,
        MedicamentoFarmaciaReadDTO,
      );
      return medDTO;
    }
    return null;
  }

  public async uploadMedPhoto(
    photo: Express.Multer.File,
  ): Promise<cloudinary.UploadApiResponse> {
    try {
      return cloudinary.v2.uploader.upload(
        `data:image/png;base64,${photo.buffer.toString('base64')}`,
        {
          folder: 'medicamentos',
        },
        (e, r) => {
          if (e) return null;
          return r;
        },
      );
    } catch (error) {
      return null;
    }
  }

  public async updateImage(medId: number, imagen: string): Promise<boolean> {
    const updated = await this._medicamentoRepository.update(medId, { imagen });
    return updated.affected > 0;
  }

  public async restarStock(id: number, cantidad: number): Promise<boolean> {
    const medicamento = await this._medicamentoRepository.findOne(id);
    const stock = medicamento.stock - cantidad;
    const updaed = await this._medicamentoRepository.update(id, { stock });
    return updaed.affected > 0;
  }

  public deleteImage(filename: string, folder: string): void {
    const imagePath = resolve(__dirname, `../../${folder}/${filename}`);
    if (existsSync(imagePath)) {
      unlinkSync(imagePath);
    }
  }
}
