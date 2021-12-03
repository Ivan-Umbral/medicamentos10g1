import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ColoniaReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;

  @Expose()
  codigoPostal: string;
}
