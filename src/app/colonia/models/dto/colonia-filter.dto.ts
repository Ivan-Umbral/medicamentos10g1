import { IsNotEmpty, IsString, Length } from 'class-validator';
import {
  IsOnlyLetters,
  IsSqlInjection,
  IsTwoBlanks,
} from 'src/common/security/custom-validations';
import {
  ONLY_LETTERS_MESSAGE,
  TWO_BLANKS_MESSAGE,
  SQL_INJECTION_MESSAGE,
} from '../../../../common/security/validation-messages/validation-messages';

export class ColoniaFilterDTO {
  @IsSqlInjection({ message: SQL_INJECTION_MESSAGE })
  @IsTwoBlanks({ message: TWO_BLANKS_MESSAGE })
  @IsOnlyLetters({ message: ONLY_LETTERS_MESSAGE })
  @Length(1, 50)
  @IsString()
  @IsNotEmpty()
  coloniaName: string;
}
