import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Lessons } from './lessons';
import { Students } from './students';

@Entity()
export class Lessons_students {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lessons, (lesson) => lesson.attendances)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lessons;

  @ManyToOne(() => Students, (student) => student.attendances)
  @JoinColumn({ name: 'student_id' })
  student: Students;

  @Column({ type: 'char' })
  visit: 1 | 0;
}
