import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Teachers } from '../../entites/teachers';
import { Errors } from '../../utils/handle.error';
import { errorIfNan } from '../../utils/is.nan';

@Injectable()
export class TeachersRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Teachers)
    private readonly teachersRepository: Repository<Teachers>,
  ) {}

  async findTeachers(ids: string[]) {
    errorIfNan(...ids);

    const result = await this.teachersRepository.find({
      where: { id: In(ids) },
      select: ['id'],
    });

    if (result.length == 0) throw new Errors.NOT_FOUND();
    return result;
  }

  async findTeachersForLessons(ids: number[]) {
    const result = await this.teachersRepository
      .createQueryBuilder('t')
      .where('t.id IN (:...teachers)', { teachers: ids })
      .getMany();

    if (result.length == 0) throw new Errors.NOT_FOUND();
    return result;
  }
}
