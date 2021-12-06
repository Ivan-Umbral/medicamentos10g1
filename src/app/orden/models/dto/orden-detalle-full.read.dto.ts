import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UsuarioOrdenDetalleReadDTO {
  @Expose()
  nombre: string;

  @Expose()
  apellidoPaterno: string;

  @Expose()
  apellidoMaterno?: string;
}

@Exclude()
export class FarmaciaDetalleOrdenReadDTO {
  @Expose()
  nombre: string;
}

@Exclude()
export class MedicamentoDetalleOrdenReadDTO {
  @Expose()
  nombre: string;

  @Expose()
  precio: number;

  @Expose()
  imagen?: string;

  @Expose()
  @Type(() => FarmaciaDetalleOrdenReadDTO)
  farmacia: FarmaciaDetalleOrdenReadDTO;
}

@Exclude()
export class DetallesOrdenesReadDTO {
  @Expose()
  cantidad: number;

  @Expose()
  @Type(() => MedicamentoDetalleOrdenReadDTO)
  medicamento: MedicamentoDetalleOrdenReadDTO;
}

@Exclude()
export class OrdenDetalleFullReadDTO {
  @Expose()
  fecha: string;

  @Expose()
  total: number;

  @Expose()
  @Type(() => UsuarioOrdenDetalleReadDTO)
  usuario: UsuarioOrdenDetalleReadDTO;

  @Expose()
  @Type(() => DetallesOrdenesReadDTO)
  detallesOrdenes: DetallesOrdenesReadDTO[];
}
