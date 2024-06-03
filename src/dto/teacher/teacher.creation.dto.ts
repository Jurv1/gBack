import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TeacherCreationDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @Length(1, 60)
  @ApiProperty()
  name: string;
}
