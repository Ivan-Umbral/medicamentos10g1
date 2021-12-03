import { Exclude, Expose, Type } from 'class-transformer';
import { PerfilReadDTO } from '../../../perfil/models/dto/perfil.dto';
import { DireccionReadDTO } from '../../../direccion/models/dto/direccion.dto';

@Exclude()
export class FarmaciaReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  rfc: string;

  @Expose()
  descripcion: string;

  @Expose()
  telefono: string;

  @Expose()
  @Type(() => PerfilReadDTO)
  perfil: PerfilReadDTO;

  @Expose()
  @Type(() => DireccionReadDTO)
  direccion?: DireccionReadDTO;
}
