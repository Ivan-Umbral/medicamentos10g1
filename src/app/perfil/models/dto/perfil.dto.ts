import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { RoleAuthReadDTO } from '../../../role/models/dto/role.dto';
import { UsuarioAuthReadDTO } from '../../../usuario/models/dto/usuario.dto';
import { FarmaciaAuthReadDTO } from '../../../farmacia/models/dto/farmacia.dto';
import { RepartidorAuthReadDTO } from '../../../repartidor/models/dto/repartidor.dto';
import {
  IsAlphanumeric,
  IsEmail,
  Length,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import {
  IsAlphanumericMx,
  IsSqlInjection,
  IsTwoBlanks,
  IsAlphanumericWithBlanksMx,
  IsBlank,
} from 'src/common/security/custom-validations';
import {
  ALPHANUMERIC_MX_MESSAGE,
  TWO_BLANKS_MESSAGE,
  ALPHANUMERIC_WITH_BLANKS_MX_MESSAGE,
  SQL_INJECTION_MESSAGE,
  BLANK_MESSAGE,
} from '../../../../common/security/validation-messages/validation-messages';

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
  @Length(5, 150)
  // @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  correoElectronico: string;

  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  // @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsAlphanumericMx({ message: ALPHANUMERIC_MX_MESSAGE })
  @Length(5, 80)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  username: string;

  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsBlank({ message: BLANK_MESSAGE })
  @Length(4, 80)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  contrasena: string;
}

@Exclude()
export class PerfilReadDTO {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  correoElectronico: string;
}
