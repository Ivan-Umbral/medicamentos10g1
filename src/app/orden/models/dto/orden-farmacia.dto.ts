import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class MedicamentoOrdenFarmacia {
  @Expose()
  nombre: string;
}

@Exclude()
export class UsuarioOrdenFarmacia {
  @Expose()
  nombre: string;

  @Expose()
  apellidoPaterno: string;
}

@Exclude()
export class DetalleOrdenFarmaciaReadDTO {
  @Type(() => MedicamentoOrdenFarmacia)
  @Expose()
  medicamento: MedicamentoOrdenFarmacia;
}

@Exclude()
export class OrdenFarmaciaReadDTO {
  @Expose()
  fecha: string;

  @Expose()
  total: number;

  @Type(() => DetalleOrdenFarmaciaReadDTO)
  @Expose()
  detallesOrdenes: DetalleOrdenFarmaciaReadDTO[];

  @Type(() => UsuarioOrdenFarmacia)
  @Expose()
  usuario: UsuarioOrdenFarmacia;
}
