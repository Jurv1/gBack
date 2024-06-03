import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LessonsService } from '../../infrastructure/lessons/lessons.service';
import { LessonsQueryParams } from '../../dto/lessons/lessons.query.params';
import { filterForLessons } from '../../utils/filter.for.lessons';
import { LessonCreateDto } from '../../dto/lessons/lesson.create.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Lesson')
@Controller('/')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @ApiQuery({
    name: 'date',
    description: 'Строка формата "2024-06-07, 2024-07-07"',
    required: false,
  })
  @ApiQuery({
    name: 'status',
    description: '1 | 0',
    required: false,
  })
  @ApiQuery({
    name: 'teachersIds',
    description: 'передавать на подобии 1,2,3',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'дефолт 1 - что странно - но так в ТЗ',
    required: false,
  })
  @ApiQuery({
    name: 'lessonsPerPage',
    description: 'пагинация',
    required: false,
  })
  async getAllLessons(@Query() query?: LessonsQueryParams) {
    const filter = filterForLessons(query);

    return this.lessonsService.getAllLessons(filter);
  }

  @Post('/lessons')
  async createLessons(@Body() lessonsCreationDto: LessonCreateDto) {
    return await this.lessonsService.createLessons(lessonsCreationDto);
  }
}
