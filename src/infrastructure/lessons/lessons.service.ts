import { Injectable } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { Lessons } from '../../entites/lessons';
import { LessonCreateDto } from '../../dto/lesson.create.dto';
import { InsertResult } from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(protected lessonRepository: LessonsRepository) {}

  async getAllLessons(filter: { [key: string]: string | number | number[] }) {
    return await this.lessonRepository;
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
          date: date.toISOString(),
          //@ts-ignore
          teacher: lessonsDto.teacherIds,
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
