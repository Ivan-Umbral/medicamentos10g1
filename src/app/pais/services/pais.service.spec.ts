import { Test, TestingModule } from '@nestjs/testing';
import { PaisService } from './pais.service';
import { MapperService } from '../../../common/mapper/services/mapper.service';
import { Repository } from 'typeorm';
import { Pais } from '../../../data/entities/pais.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PaisService', () => {
  let service: PaisService;
  // let repositoryMock: MockType<Repository<Pais>>;
  let repository: Repository<Pais>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaisService,
        MapperService,
        { provide: getRepositoryToken(Pais), useClass: Repository },
      ],
    }).compile();

    service = module.get<PaisService>(PaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
