import { Injectable } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { Lessons } from '../../entites/lessons';
import { LessonCreateDto } from '../../dto/lesson.create.dto';
import { InsertResult } from 'typeorm';
import { Teachers } from '../../entites/teachers';

@Injectable()
export class LessonsService {
  constructor(protected lessonRepository: LessonsRepository) {}

  async getAllLessons(filter: {
    [key: string]: string | number | number[] | Date;
  }) {
    return await this.lessonRepository.getAllLessons(filter);
  }

  async createLessons(lessonsDto: LessonCreateDto): Promise<InsertResult> {
    const lessons: Lessons[] = [];
    const date = new Date(lessonsDto.firstDate);
    let count = 0;
    while (
      (lessonsDto.lessonsCount && count <= lessonsDto.lessonsCount) ||
      (lessonsDto.lastDate && date <= new Date(lessonsDto.lastDate))
    ) {
      console.log(lessonsDto.days.includes(date.getDay()));
      if (lessonsDto.days.includes(date.getDay())) {
        const lesson: Lessons = {
          title: lessonsDto.title,
          date: date.toISOString().substring(0, 10),
          // @ts-ignore
          teachers: lessonsDto.teacherIds as Teachers[],
          status: 0,
          createdAt: date,
        };
        lessons.push(lesson);
      }
      date.setDate(date.getDate() + 1);
      count++;
    }

    return await this.lessonRepository.createLessons(lessons);
  }
}
