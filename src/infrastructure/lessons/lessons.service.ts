import { Injectable } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { Lessons } from '../../entites/lessons';
import { LessonCreateDto } from '../../dto/lesson.create.dto';
import { Errors } from '../../utils/handle.error';
import { TeachersRepository } from '../teachers/teachers.repository';

@Injectable()
export class LessonsService {
  constructor(
    protected lessonRepository: LessonsRepository,
    protected teacRepo: TeachersRepository,
  ) {}

  async getAllLessons(filter: {
    [key: string]: string | number | number[] | Date;
  }) {
    return await this.lessonRepository.getAllLessons(filter);
  }

  async createLessons(lessonsDto: LessonCreateDto) {
    const date = new Date(lessonsDto.firstDate);
    if (lessonsDto?.lessonsCount > 300 || lessonsDto?.lessonsCount < 0)
      throw new Errors.BAD_REQUEST();

    if (lessonsDto.lessonsCount && lessonsDto.lastDate)
      throw new Errors.BAD_REQUEST();

    if (lessonsDto.lastDate) {
      let diff =
        (new Date(lessonsDto.lastDate).getTime() - date.getTime()) / 1000;
      diff /= 60 * 60 * 24;
      const year = Math.abs(Math.round(diff / 365.25));
      if (year >= 1) throw new Errors.BAD_REQUEST();
    }

    const lessons: Partial<Lessons>[] = [];

    const teachers = await this.teacRepo.findTeachersForLessons(
      lessonsDto.teacherIds,
    );

    let count = 0;
    while (
      (lessonsDto.lessonsCount && count <= lessonsDto.lessonsCount) ||
      (lessonsDto.lastDate && date <= new Date(lessonsDto.lastDate))
    ) {
      if (lessonsDto.days.includes(date.getDay())) {
        const lesson: Partial<Lessons> = {
          title: lessonsDto.title,
          date: date.toISOString().substring(0, 10),
          status: 0,
          teachers: teachers,
          createdAt: date,
        };
        lessons.push(lesson);
      }
      if (lessonsDto?.lessonsCount == 1) break;
      date.setDate(date.getDate() + 1);
      count++;
    }

    return await this.lessonRepository.createLessons(lessons);
  }
}
