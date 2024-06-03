import { Body, Controller, Post } from '@nestjs/common';
import { TeachersRepository } from '../../infrastructure/teachers/teachers.repository';
import { TeacherCreationDto } from '../../dto/teacher/teacher.creation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teacher')
@Controller('/teachers')
export class TeacherController {
  constructor(private readonly teacherRepository: TeachersRepository) {}

  @Post()
  async createLessons(@Body() teacherCreationDto: TeacherCreationDto) {
    return await this.teacherRepository.createTeacher(teacherCreationDto);
  }
}
