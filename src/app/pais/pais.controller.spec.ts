import { Test, TestingModule } from '@nestjs/testing';
import { PaisController } from './pais.controller';
import { PaisService } from './services/pais.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Pais } from '../../data/entities/pais.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MapperService } from '../../common/mapper/services/mapper.service';
import { MapperModule } from '../../common/mapper/mapper.module';
import { PaisCreateDTO } from './models/dto/pais.create.dto';

describe('PaisController', () => {
  let controller: PaisController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaisController],
      providers: [
        PaisService,
        MapperService,
        { provide: getRepositoryToken(Pais), useClass: Repository },
      ],
      imports: [MapperModule],
    }).compile();

    controller = module.get<PaisController>(PaisController);
    // app = module.createNestApplication();
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /* it('Debe retornar Bad Request 400 (Requerido)', async () => {
    const response = await request(app.getHttpServer())
      .post('/paises')
      .send({ nombre: '' })
      .expect(400);
    expect(response.statusCode).toEqual(400);
    /* expect(controller).toBeDefined();
  }); */

  /* it('Debe retornar bad request (Requerido)', async () => {
    const pais: PaisCreateDTO = new PaisCreateDTO();
    pais.nombre = 'mmmmm  mm';
    const response = await request(app.getHttpServer())
      .post('api/v1/paises')
      .send(pais)
      .expect(400);
    expect(response.statusCode).toEqual(400);
  }); */
});
