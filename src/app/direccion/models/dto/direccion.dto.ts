import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class DireccionCreateDTO {
  @IsNotEmpty()
  calle: string;

  @IsInt()
  numeroInterior?: number;

  @IsOptional()
  @IsInt()
  numeroExterior?: number;

  @IsInt()
  estadoId: number;

  @IsInt()
  municipioId: number;

  @IsInt()
  coloniaId: number;
}
