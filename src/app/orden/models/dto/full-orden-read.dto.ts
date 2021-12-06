import { Expose, Exclude, Type } from 'class-transformer';

@Exclude()
export class MedicamentoOrdenReadDTO {
  @Expose()
  id: number;
}

@Exclude()
export class UsuarioOrdenReadDTO {
  @Expose()
  id: number;
}

@Exclude()
export class DetalleOrdenReadDTO {
  @Expose()
  cantidad: number;

  @Type(() => MedicamentoOrdenReadDTO)
  @Expose()
  medicamento: MedicamentoOrdenReadDTO;

  @Expose()
  id: number;
}

@Exclude()
export class FullOrdenReadDTO {
  @Expose()
  fecha: string;

  @Expose()
  hora: string;

  @Expose()
  total: number;

  @Expose()
  tipoPago: string;

  @Type(() => UsuarioOrdenReadDTO)
  @Expose()
  usuario: UsuarioOrdenReadDTO;

  @Type(() => DetalleOrdenReadDTO)
  @Expose()
  detallesOrdenes: DetalleOrdenReadDTO[];

  @Expose()
  stripeChargeId?: string;

  @Expose()
  id: number;
}
