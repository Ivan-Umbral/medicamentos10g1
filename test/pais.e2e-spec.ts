import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PaisModule } from '../src/app/pais/pais.module';
import { MapperService } from '../src/common/mapper/services/mapper.service';
import { MapperModule } from '../src/common/mapper/mapper.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Pais } from '../src/data/entities/pais.entity';
import { Repository } from 'typeorm';
import { PaisService } from '../src/app/pais/services/pais.service';

describe('PaisController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PaisModule,
        MapperModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '1234',
          database: 'medicamentos10g1',
          entities: ['**/src/data/entities/*{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: false,
        }),
      ],
      providers: [
        MapperService,
        PaisService,
        { provide: getRepositoryToken(Pais), useClass: Repository },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('Debe retornar bad request (Requerido)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/paises')
      .set('Content-Type', 'application/json')
      .send({ nombre: '' });
    expect(response.statusCode).toEqual(400);
  });

  it('Debe retornar bad request (Solo letras)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/paises')
      .set('Content-Type', 'application/json')
      .send({ nombre: '123456l099', descripcion: '......???¡¡¡¡°11222192929' });
    expect(response.statusCode).toEqual(400);
  });

  it('Debe retornar bad request (Más de 1 espacio en blanco)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/paises')
      .set('Content-Type', 'application/json')
      .send({
        nombre: 'ss  lslsllsl  sls',
        descripcion: 'aaaaa  aaasasass  cbgddgggffbgb  ',
      });
    expect(response.statusCode).toEqual(400);
  });

  it('Debe retornar bad request (SQL Injection)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/paises')
      .set('Content-Type', 'application/json')
      .send({
        nombre: 'create table insert into',
        descripcion: 'drop table olv',
      });
    expect(response.statusCode).toEqual(400);
  });
});
