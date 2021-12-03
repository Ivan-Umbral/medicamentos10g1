import { ALPHANUMERIC_WITH_BLANKS_MX_REGEX } from '../regexs/regex';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class AlphanumericWithBlanksMxConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    return ALPHANUMERIC_WITH_BLANKS_MX_REGEX.test(value);
  }
}

export const IsAlphanumericWithBlanksMx = (
  validationOptions?: ValidationOptions,
) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: AlphanumericWithBlanksMxConstraint,
    });
  };
};
