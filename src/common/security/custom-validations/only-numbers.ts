import { ONLY_NUMBERS_REGEX } from '../regexs/regex';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class OnlyNumbersConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return ONLY_NUMBERS_REGEX.test(value);
  }
}

export const IsOnlyNumbers = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: OnlyNumbersConstraint,
    });
  };
};
