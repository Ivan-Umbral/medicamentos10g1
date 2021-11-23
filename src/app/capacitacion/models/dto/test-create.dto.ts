import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsOnlyLetters } from 'src/common/security/custom-validations';
import { ONLY_LETTERS_MESSAGE } from 'src/common/security/validation-messages/validation-messages';

export class TestCreateDTO {
  @IsNotEmpty()
  nombre: string;

  @IsOnlyLetters({ message: ONLY_LETTERS_MESSAGE })
  @IsOptional()
  descripcion?: string;
}
