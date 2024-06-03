import { configModule } from './api/config/config.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LessonsController } from './api/lessons/lessons.controller';
import { LessonsService } from './infrastructure/lessons/lessons.service';
import { LessonsRepository } from './infrastructure/lessons/lessons.repository';
import { Lessons } from './entites/lessons';
import { Students } from './entites/students';
import { Teachers } from './entites/teachers';
import { TeachersRepository } from './infrastructure/teachers/teachers.repository';
import { IsTeachersExists } from './utils/is.teachers.exists';
import { Lessons_students } from './entites/lessons_students';
import { TeacherController } from './api/teachers/teacher.controller';

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.NEON_HOST,
  port: 5432,
  username: process.env.NEON_USERNAME,
  password: process.env.NEON_PASS,
  database: process.env.NEON_NAME_FOR_ENTITIES,
  autoLoadEntities: true,
  synchronize: true,
  ssl: true,
};

@Module({
  imports: [
    configModule,
    TypeOrmModule.forRoot(options),
    TypeOrmModule.forFeature([Lessons, Students, Teachers, Lessons_students]),
  ],
  controllers: [AppController, LessonsController, TeacherController],
  providers: [
    AppService,
    LessonsService,
    LessonsRepository,
    TeachersRepository,
    IsTeachersExists,
  ],
})
export class AppModule {}
