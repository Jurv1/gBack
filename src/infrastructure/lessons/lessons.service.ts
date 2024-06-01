import { Injectable } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { Lessons } from '../../entites/lessons';

@Injectable()
export class LessonsService {
  constructor(protected lessonRepository: LessonsRepository) {}
  async createLessons(): Promise<Lessons[] | null> {
    return;
  }
}
