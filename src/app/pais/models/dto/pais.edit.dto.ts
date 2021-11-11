import { PartialType } from '@nestjs/mapped-types';
import { PaisCreateDTO } from './pais.create.dto';

export class PaisEditDTO extends PartialType(PaisCreateDTO) {}
