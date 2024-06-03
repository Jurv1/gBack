import { IsTeachersExist } from '../utils/is.teachers.exists';
import { Optional } from '@nestjs/common';
import { ValidateIf } from 'class-validator';

export class LessonsQueryParams {
  date: string;

  status: 1 | 0;

  @ValidateIf((o) => o.otherProperty === 'value')
  @IsTeachersExist()
  teachersIds?: string;

  studentsCount: string;

  page: string;

  lessonsPerPage: string;
}
