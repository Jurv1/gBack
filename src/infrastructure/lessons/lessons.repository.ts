import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Lessons } from '../../entites/lessons';
import { Lessons_students } from '../../entites/lessons_students';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Lessons)
    private readonly lessonsRepository: Repository<Lessons>,
    @InjectRepository(Lessons_students)
    private readonly lessonsStudentsRepo: Repository<Lessons_students>,
  ) {}

  async getAllLessons(filter: { [key: string]: string | number | number[] }) {
    const query = this.lessonsStudentsRepo
      .createQueryBuilder('ls')
      .leftJoinAndSelect('ls.lessons', 'lesson')
      .leftJoinAndSelect('ls.students', 'student')
      .addSelect('COUNT(student.id) AS studentsCount')
      .leftJoinAndSelect('lesson.teacher', 'teacher');
    // const query = this.lessonsRepository.createQueryBuilder('lessons');
    if (filter['fromDate']) {
      query.andWhere('lesson.date >= :fromDate', {
        fromDate: filter['fromDate'],
      });
      query.andWhere('lesson.date <= :toDate', { toDate: filter['toDate'] });
    }

    if (filter['teachers']) {
      query.andWhere('lesson.teacher IN :teachers', {
        teachers: filter['teachers'],
      });
    }

    if (filter['studentsCount']) {
      query.andWhere('studentsCount <= :fromSt AND studentsCount >= :toSt', {
        fromSt: filter,
        toSt: filter,
      });
    }

    if (filter['visit']) {
      query.andWhere('ls.visit = :visit', { visit: filter['visit'] });
    }

    if (filter['offset']) {
      query.offset(filter['offset'] as number);
    }

    if (filter['limit']) {
      query.limit(filter['limit'] as number);
    }

    return await query.getManyAndCount();
  }
  async createLessons(lessons: Lessons[]): Promise<Lessons[] | null> {
    return await this.lessonsRepository.save(lessons);
  }
}
