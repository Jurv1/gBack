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
      .leftJoinAndSelect('l.students', 'ls')
      .leftJoinAndSelect('ls.students', 's')
      .leftJoinAndSelect('l.teachers', 't')

      //Вот эта штука не хочет работать без getRawMany как не пытался
      .addSelect(
        'COUNT(CASE WHEN ls.visit = true THEN 1 ELSE NULL END) AS visitCount',
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
        's.name',
        'ls.visit',
      ])
      .groupBy(' l.id, t.id,  ls.id, s.id, s.name')
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
