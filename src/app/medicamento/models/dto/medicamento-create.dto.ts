import { IsString, IsNumber, IsInt } from 'class-validator';

export class MedicamentoCreateDTO {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  precio: number;

  @IsInt()
  stock: number;

  @IsNumber()
  descuento: number;

  @IsString()
  caducidad: string;

  @IsInt()
  farmaciaId: number;
}
