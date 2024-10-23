import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPasswordValidConstraint implements ValidatorConstraintInterface {
  validate(password: string): boolean {
    const hasMinimumLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasMinimumLength && hasLetter && hasNumber && hasSpecialCharacter;
  }

  defaultMessage(): string {
    return 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.';
  }
}

export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordValidConstraint,
    });
  };
}
