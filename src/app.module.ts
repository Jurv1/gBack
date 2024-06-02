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
import { Lessons_students } from './entites/lessons_students';

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_FOR_ENTITIES,
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    configModule,
    TypeOrmModule.forRoot(options),
    TypeOrmModule.forFeature([Lessons, Students, Teachers, Lessons_students]),
  ],
  controllers: [AppController, LessonsController],
  providers: [AppService, LessonsService, LessonsRepository],
})
export class AppModule {}
