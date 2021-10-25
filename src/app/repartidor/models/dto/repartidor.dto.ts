import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RepartidorAuthReadDTO {
  @Expose()
  id: number;
}
