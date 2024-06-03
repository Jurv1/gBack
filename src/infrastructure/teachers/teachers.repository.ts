import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Teachers } from '../../entites/teachers';

@Injectable()
export class TeachersRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Teachers)
    private readonly teachersRepository: Repository<Teachers>,
  ) {}
}
