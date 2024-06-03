import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { IsTeachersExist } from '../utils/is.teachers.exists';

export class LessonCreateDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @IsTeachersExist()
  teacherIds: number[]; // id учителей, ведущих занятия

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @Length(1, 100)
  title: string; // Тема занятия. Одинаковая на все создаваемые занятия

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  days: number[]; // Дни недели, по которым нужно создать занятия, где 0 - это воскресенье

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  firstDate: string; // Первая дата, от которой нужно создавать занятия

  @Optional()
  @Type(() => Number)
  @IsNumber()
  lessonsCount: number; // Количество занятий для создания

  @Optional()
  lastDate: string; // Последняя дата, до которой нужно создавать занятия.
}
