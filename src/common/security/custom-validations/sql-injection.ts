import { SQL_INJECTION_REGEX } from '../regexs/regex';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsSqlInjectionConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return !SQL_INJECTION_REGEX.test(value);
  }
}

export const IsSqlInjection = (validationOptions?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSqlInjectionConstraint,
    });
  };
};
