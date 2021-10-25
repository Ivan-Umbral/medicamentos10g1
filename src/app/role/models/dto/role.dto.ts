import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RoleAuthReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;
}
