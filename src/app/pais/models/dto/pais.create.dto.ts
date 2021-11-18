import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import {
  IsOnlyLetters,
  IsSqlInjection,
  IsTwoBlanks,
} from '../../../../common/security/custom-validations';
import {
  SQL_INJECTION_MESSAGE,
  TWO_BLANKS_MESSAGE,
  ONLY_LETTERS_MESSAGE,
} from '../../../../common/security/validation-messages/validation-messages';

export class PaisCreateDTO {
  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsOnlyLetters({ message: ONLY_LETTERS_MESSAGE })
  @Length(5, 100)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsOnlyLetters({ message: ONLY_LETTERS_MESSAGE })
  @Length(5, 255)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  descripcion?: string;
}
