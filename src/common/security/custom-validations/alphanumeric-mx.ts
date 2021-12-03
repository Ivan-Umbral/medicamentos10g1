import { ALPHANUMERIC_MX_REGEX } from '../regexs/regex';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class AlphanumericMxConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return ALPHANUMERIC_MX_REGEX.test(value);
  }
}

export const IsAlphanumericMx = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: AlphanumericMxConstraint,
    });
  };
};
