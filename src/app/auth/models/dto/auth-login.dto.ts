import { IsNotEmpty, Length, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  SQL_INJECTION_MESSAGE,
  TWO_BLANKS_MESSAGE,
  ALPHANUMERIC_MX_MESSAGE,
  BLANK_MESSAGE,
} from '../../../../common/security/validation-messages/validation-messages';
import {
  IsSqlInjection,
  IsAlphanumericMx,
  IsTwoBlanks,
  IsBlank,
} from '../../../../common/security/custom-validations';

export class AuthLoginDTO {
  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
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
  password: string;
}
