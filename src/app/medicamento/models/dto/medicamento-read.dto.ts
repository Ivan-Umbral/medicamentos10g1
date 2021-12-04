import { Exclude, Expose, Type } from 'class-transformer';
import { DireccionReadDTO } from '../../../direccion/models/dto/direccion.dto';

@Exclude()
export class FarmaciaWOProfileReadDTO {
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
  @Type(() => DireccionReadDTO)
  direccion?: DireccionReadDTO;
}

@Exclude()
export class MedicamentoReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion: string;

  @Expose()
  precio: number;

  @Expose()
  stock: number;

  @Expose()
  descuento: number;

  @Expose()
  caducidad: string;

  @Expose()
  imagen?: string;

  @Expose()
  @Type(() => FarmaciaWOProfileReadDTO)
  farmacia: FarmaciaWOProfileReadDTO;
}
