import { Exclude, Expose, Type } from 'class-transformer';
import { RoleAuthReadDTO } from '../../../role/models/dto/role.dto';
import { UsuarioAuthReadDTO } from '../../../usuario/models/dto/usuario.dto';
import { FarmaciaAuthReadDTO } from '../../../farmacia/models/dto/farmacia.dto';
import { RepartidorAuthReadDTO } from '../../../repartidor/models/dto/repartidor.dto';
import { IsAlphanumeric, IsEmail, Length, IsNotEmpty } from 'class-validator';

@Exclude()
export class PerfilAuthReadDTO {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  correoElectronico: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => RoleAuthReadDTO)
  rol: RoleAuthReadDTO;

  @Expose()
  @Type(() => UsuarioAuthReadDTO)
  usuarios?: UsuarioAuthReadDTO[];

  @Expose()
  @Type(() => FarmaciaAuthReadDTO)
  farmacias?: FarmaciaAuthReadDTO[];

  @Expose()
  @Type(() => RepartidorAuthReadDTO)
  repartidores?: RepartidorAuthReadDTO[];
}

export class PerfilAuthPayload {
  id: number;
  username: string;
  correoElectronico: string;
  rolId: number;
  ownerId: number;
  refreshToken: string;
}

export class PerfilCreateDTO {
  @IsEmail()
  @IsNotEmpty()
  @Length(10, 150)
  correoElectronico: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  contrasena: string;
}
