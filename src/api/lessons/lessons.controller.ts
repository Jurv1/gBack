import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LessonsService } from '../../infrastructure/lessons/lessons.service';
import { LessonsQueryParams } from '../../dto/lessons.query.params';
import { filterForLessons } from '../../utils/filter.for.lessons';
import { LessonCreateDto } from '../../dto/lesson.create.dto';

@Controller('/')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  async getAllLessons(@Query() query: LessonsQueryParams) {
    const filter = filterForLessons(query);

    return this.lessonsService.getAllLessons(filter);
  }

  @Post('/lessons')
  async createLessons(@Body() lessonsCreationDto: LessonCreateDto) {
    const result = await this.lessonsService.createLessons(lessonsCreationDto);
    return result['identifiers'];
  }
}
