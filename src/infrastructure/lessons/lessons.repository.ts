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
      //Здесь как будто релейшен не в ту сторону - так как к student прикрепляется еще сту
      .leftJoinAndSelect('l.teachers', 't')
      .leftJoinAndSelect('l.students', 's')
      .leftJoinAndSelect('s.students', 'ls')
      //Вот эта штука не хочет работать без getRawMany как не пытался
      .addSelect(
        'COUNT(CASE WHEN s.visit = true THEN 1 ELSE NULL END)',
        'visitCount',
      )
      .select([
        'l.id',
        'l.status',
        'l.title',
        'l.date',
        't.id',
        't.name',
        's.id',
        's.visit',
        'ls.name',
      ])
      .groupBy(' l.id, t.id,  s.id, ls.id')
      .orderBy('l.id');

    console.log(filter);
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
