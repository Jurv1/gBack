import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { IsTeachersExist } from '../../utils/is.teachers.exists';
import { ApiProperty } from '@nestjs/swagger';

export class LessonCreateDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @IsTeachersExist()
  @ApiProperty()
  teacherIds: number[]; // id учителей, ведущих занятия

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @Length(1, 100)
  @ApiProperty()
  title: string; // Тема занятия. Одинаковая на все создаваемые занятия

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty()
  days: number[]; // Дни недели, по которым нужно создать занятия, где 0 - это воскресенье

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ description: 'дата формата "2024-06-03"' })
  firstDate: string; // Первая дата, от которой нужно создавать занятия

  @ValidateIf((o) => o.otherProperty === 'value')
  @Optional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  lessonsCount: number; // Количество занятий для создания

  @Optional()
  @ApiProperty({ description: 'дата формата "2024-06-03"' })
  lastDate: string; // Последняя дата, до которой нужно создавать занятия.
}
