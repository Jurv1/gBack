import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  InsertResult,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Lessons } from '../../entites/lessons';
import { Lessons_students } from '../../entites/lessons_students';
import { queryAdder } from '../../utils/query.adder';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Lessons)
    private readonly lessonsRepository: Repository<Lessons>,
    @InjectRepository(Lessons_students)
    private readonly lessonsStudentsRepo: Repository<Lessons_students>,
  ) {}

  async getAllLessons(filter: {
    [key: string]: string | number | number[] | Date;
  }) {
    let query: SelectQueryBuilder<Lessons> = this.lessonsRepository
      .createQueryBuilder('l')
      .leftJoinAndSelect('l.teachers', 't')
      .leftJoinAndSelect('l.students', 's')
      .leftJoinAndSelect('s.students', 'ls')
      .addSelect(
        'COUNT(CASE WHEN s.visit = true THEN 1 ELSE NULL END)',
        'visitCount',
      )
      .groupBy(' l.id, t.id, s.id, ls.id')
      .orderBy('l.id');

    query = queryAdder(query, filter);

    console.log(query.getQuery());

    return query.getMany();
  }
  async createLessons(lessons: Lessons[]): Promise<InsertResult> {
    return await this.lessonsRepository
      .createQueryBuilder('lessons')
      .insert()
      .values(lessons)
      .returning('id')
      .execute();
  }
}
