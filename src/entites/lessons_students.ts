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

  @ManyToOne(() => Lessons, (lesson) => lesson.students)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lessons;

  @ManyToOne(() => Students, (student) => student.lessonsStudents)
  @JoinColumn({ name: 'student_id' })
  students: Students;

  @Column({ type: 'bool', default: false })
  visit: boolean;
}
