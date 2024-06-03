import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  In,
  InsertResult,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Lessons } from '../../entites/lessons';
import { Lessons_students } from '../../entites/lessons_students';
import { queryAdder } from '../../utils/query.adder';
import { Teachers } from '../../entites/teachers';
import { Errors } from '../../utils/handle.error';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Lessons)
    private readonly lessonsRepository: Repository<Lessons>,
    @InjectRepository(Lessons_students)
    private readonly lessonsStudentsRepo: Repository<Lessons_students>,
    @InjectRepository(Teachers)
    private readonly teachersRepo: Repository<Teachers>,
  ) {}

  async getAllLessons(filter: {
    [key: string]: string | number | number[] | Date;
  }) {
    if (filter['teachers']) {
      console.log(filter['teachers']);
      const result = await this.teachersRepo.find({
        where: { id: In(filter['teachers'] as number[]) },
        select: ['id'],
      });
      if (result.length == 0) throw new Errors.NOT_FOUND();
    }

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
