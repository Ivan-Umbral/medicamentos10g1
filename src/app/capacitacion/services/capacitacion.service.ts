import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from '../../../data/entities/test.entity';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/services/mapper.service';
import { TestReadDTO } from '../models/dto';
import { TestCreateDTO } from '../models/dto/test-create.dto';

@Injectable()
export class CapacitacionService {
  constructor(
    @InjectRepository(Test) private _testRepository: Repository<Test>,
    private _mapperService: MapperService,
  ) {}

  public async getAll(): Promise<TestReadDTO[]> {
    const registros = await this._testRepository.find();
    if (registros) {
      const registrosDTO = this._mapperService.toArrayDTO<TestReadDTO>(
        registros,
        TestReadDTO,
      );
      return registrosDTO;
    }
    return null;
  }

  public async createOne(body: TestCreateDTO): Promise<TestReadDTO> {
    const testEntity = this._testRepository.create(body);
    const test = await this._testRepository.save(testEntity);
    if (test) {
      const testDTO = this._mapperService.toDTO<TestReadDTO>(test, TestReadDTO);
      return testDTO;
    }
    return null;
  }
}
