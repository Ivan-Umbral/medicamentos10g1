import { Injectable } from '@nestjs/common';
import {
  classToPlain,
  plainToClass,
  ClassConstructor,
} from 'class-transformer';

@Injectable()
export class MapperService {
  public toDTO<T>(object: T, entity: ClassConstructor<T>): T {
    const plainObject = classToPlain(object);
    const dtoObjectTransform = plainToClass(entity, plainObject);
    return dtoObjectTransform;
  }

  public toArrayDTO<T>(objects: T[], entity: ClassConstructor<T>): T[] {
    return objects.map((object) => {
      const plainObject = classToPlain(object);
      return plainToClass(entity, plainObject);
    });
  }
}
