import { registerDecorator, ValidationOptions } from 'class-validator';
import { isValidObjectId } from 'mongoose';

export function IsArrayValidObjectId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidObjectId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { message: 'Invalid _id', ...validationOptions },
      validator: {
        validate(values: string | string[]) {
          return Array.isArray(values)
            ? values.every((i) => isValidObjectId(i))
            : isValidObjectId(values);
        },
      },
    });
  };
}
