import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TeachersRepository } from '../infrastructure/teachers/teachers.repository';
import { Teachers } from '../entites/teachers';

@ValidatorConstraint({ name: 'IsTeachersExists', async: true })
@Injectable()
export class IsTeachersExists implements ValidatorConstraintInterface {
  constructor(private readonly teachersRepository: TeachersRepository) {}
  async validate(ids: string[]) {
    const result = await this.teachersRepository.findTeachers(ids);
    if (result) return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Teachers ($value) are not existing!';
  }
}

export const IsTeachersExist =
  (validationOptions?: ValidationOptions) =>
  (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTeachersExists,
    });
  };
