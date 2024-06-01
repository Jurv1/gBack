import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Lessons } from '../../entites/lessons';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Lessons)
    private readonly lessonsRepository: Repository<Lessons>,
  ) {}
  async createLessons(): Promise<Lessons[] | null> {
    return;
  }
}
