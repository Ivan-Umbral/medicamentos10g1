import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { DireccionCreateDTO } from 'src/app/direccion/models/dto/direccion.dto';
import { PerfilCreateDTO } from '../../../perfil/models/dto/perfil.dto';
import {
  IsTwoBlanks,
  IsSqlInjection,
  IsRFC,
} from 'src/common/security/custom-validations';
import {
  TWO_BLANKS_MESSAGE,
  SQL_INJECTION_MESSAGE,
  RFC_MESSAGE,
} from '../../../../common/security/validation-messages/validation-messages';

export class FarmaciaCreateDTO {
  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  /* @IsAlphanumeric() */
  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsRFC({ message: RFC_MESSAGE })
  /* @IsAlphanumeric() */
  @Length(13, 13)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  rfc: string;

  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  /* @IsAlphanumeric() */
  @Length(5, 255)
  @IsString()
  @IsOptional()
  descripcion: string;

  @IsPhoneNumber('MX')
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
