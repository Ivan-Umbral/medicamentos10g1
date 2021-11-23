import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TestReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;
}
