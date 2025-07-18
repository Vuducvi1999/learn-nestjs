import { registerDecorator, ValidationOptions } from 'class-validator';
import { isValidObjectId } from 'mongoose';

export function IsValidObjectId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidObjectId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { message: 'Invalid _id', ...validationOptions },
      validator: {
        validate(value: any) {
          return isValidObjectId(value);
        },
      },
    });
  };
}
