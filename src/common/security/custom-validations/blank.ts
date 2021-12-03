import { BLANK_REGEX } from '../regexs/regex';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class BlankConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return !BLANK_REGEX.test(value);
  }
}

export const IsBlank = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: BlankConstraint,
    });
  };
};
