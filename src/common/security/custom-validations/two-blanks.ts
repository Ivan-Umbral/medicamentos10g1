import { TWO_BLANKS_REGEX } from '../regexs/regex';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsTwoBlanksConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return !TWO_BLANKS_REGEX.test(value);
  }
}

export const IsTwoBlanks = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTwoBlanksConstraint,
    });
  };
};
