import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FarmaciaAuthReadDTO {
  @Expose()
  id: number;
}
