import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { PerfilCreateDTO } from '../../../perfil/models/dto/perfil.dto';
import { DireccionCreateDTO } from '../../../direccion/models/dto/direccion.dto';
import { IsString, Length } from 'class-validator';
import {
  IsOnlyLetters,
  IsSqlInjection,
  IsTwoBlanks,
  IsOnlyNumbers,
} from '../../../../common/security/custom-validations';
import {
  ONLY_LETTERS_MESSAGE,
  SQL_INJECTION_MESSAGE,
  TWO_BLANKS_MESSAGE,
  ONLY_NUMBERS_MESSAGE,
} from '../../../../common/security/validation-messages/validation-messages';
import {
  IsAlpha,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';

@Exclude()
export class UsuarioAuthReadDTO {
  @Expose()
  id: number;
}

export class UsuarioCreateDTO {
  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsOnlyLetters({ message: ONLY_LETTERS_MESSAGE })
  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  nombre: string;

  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsOnlyLetters({ message: ONLY_LETTERS_MESSAGE })
  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  apellidoPaterno: string;

  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsOnlyLetters({ message: ONLY_LETTERS_MESSAGE })
  @Length(3, 30)
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  apellidoMaterno?: string;

  // @IsPhoneNumber('MX')
  @IsOnlyNumbers({ message: ONLY_NUMBERS_MESSAGE })
  @Length(10, 10)
  @IsString()
  @IsNotEmpty()
  telefono: string;

  @ValidateNested()
  @Type(() => DireccionCreateDTO)
  direccion: DireccionCreateDTO;

  @ValidateNested()
  @Type(() => PerfilCreateDTO)
  perfil: PerfilCreateDTO;
}

export class UsuarioMovilCreateDTO {
  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsOnlyLetters({ message: ONLY_LETTERS_MESSAGE })
  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  nombre: string;

  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsOnlyLetters({ message: ONLY_LETTERS_MESSAGE })
  @Length(3, 30)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  apellidoPaterno: string;

  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsOnlyLetters({ message: ONLY_LETTERS_MESSAGE })
  @Length(3, 30)
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsOptional()
  apellidoMaterno?: string;

  // @IsPhoneNumber('MX')
  @IsOnlyNumbers({ message: ONLY_NUMBERS_MESSAGE })
  @Length(10, 10)
  @IsString()
  @IsNotEmpty()
  telefono: string;

  @ValidateNested()
  @Type(() => PerfilCreateDTO)
  perfil: PerfilCreateDTO;
}
