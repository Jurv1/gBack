import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Lessons } from '../../entites/lessons';
import { queryAdder } from '../../utils/query.adder';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Lessons)
    private readonly lessonsRepository: Repository<Lessons>,
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
  async createLessons(lessons: Partial<Lessons>[]) {
    return await this.lessonsRepository.save(lessons, {}).then((value) =>
      value.map((el) => {
        return { id: el.id };
      }),
    );
  }
}
