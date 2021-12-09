import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MedicamentoFarmaciaReadDTO {
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
}
