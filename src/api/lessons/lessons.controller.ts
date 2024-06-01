import { Controller, Get, Post } from '@nestjs/common';
import { LessonsService } from '../../infrastructure/lessons/lessons.service';

@Controller('/')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  async getAllLessons() {
    return this.lessonsService;
  }

  @Post('/lessons')
  async createLessons() {
    return this.lessonsService;
  }
}
