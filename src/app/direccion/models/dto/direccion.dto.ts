import { Exclude, Expose, Type, Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { EstadoReadDTO } from '../../../estado/models/dto/estado.dto';
import { MunicipioReadDTO } from '../../../municipio/models/dto';
import { ColoniaReadDTO } from '../../../colonia/models/dto';
import {
  IsAlphanumericMx,
  IsSqlInjection,
  IsTwoBlanks,
  IsAlphanumericWithBlanksMx,
} from 'src/common/security/custom-validations';
import {
  ALPHANUMERIC_MX_MESSAGE,
  ALPHANUMERIC_WITH_BLANKS_MX_MESSAGE,
  TWO_BLANKS_MESSAGE,
  SQL_INJECTION_MESSAGE,
} from '../../../../common/security/validation-messages/validation-messages';

export class DireccionCreateDTO {
  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsAlphanumericWithBlanksMx({ message: ALPHANUMERIC_WITH_BLANKS_MX_MESSAGE })
  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  calle: string;

  @Max(1000)
  @Min(0)
  @IsInt()
  @IsOptional()
  numeroInterior?: number;

  @Max(1000)
  @Min(0)
  @IsInt()
  @IsOptional()
  numeroExterior?: number;

  @Min(1)
  @IsInt()
  estadoId: number;

  @Min(1)
  @IsInt()
  municipioId: number;

  @Min(1)
  @IsInt()
  coloniaId: number;
}

@Exclude()
export class DireccionReadDTO {
  @Expose()
  id: number;

  @Expose()
  calle: string;

  @Expose()
  numeroInterior?: number;

  @Expose()
  numeroExterior?: number;

  @Expose()
  @Type(() => EstadoReadDTO)
  estado: EstadoReadDTO;

  @Expose()
  @Type(() => MunicipioReadDTO)
  municipio: MunicipioReadDTO;

  @Expose()
  @Type(() => ColoniaReadDTO)
  colonia: ColoniaReadDTO;
}
