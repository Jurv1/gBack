import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LessonCreateDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
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
  @IsDate()
  firstDate: string; // Первая дата, от которой нужно создавать занятия

  @IsNotEmpty()
  @IsNumber()
  lessonsCount: number; // Количество занятий для создания

  @IsNotEmpty()
  @IsDate()
  lastDate: string; // Последняя дата, до которой нужно создавать занятия.
}
