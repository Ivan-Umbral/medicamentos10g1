import { PaymentCreateDTO } from '../../../pago/models/dto';
import { Type } from 'class-transformer';
import { ValidateNested, IsNumber, IsEnum, IsInt } from 'class-validator';
import { TipoPago } from 'src/data/enums/tipo-pago.enum';

export class OrdenWDetalleCreateDTO {
  @IsNumber()
  total: number;

  @IsEnum(TipoPago)
  tipoPago: TipoPago;

  @IsInt()
  usuarioId: number;

  @IsNumber()
  cantidad: number;

  @IsInt()
  medicamentoId: number;

  @ValidateNested()
  @Type(() => PaymentCreateDTO)
  payment: PaymentCreateDTO;
}
