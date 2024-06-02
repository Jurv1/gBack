import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teachers } from './teachers';
import { Lessons_students } from './lessons_students';

@Entity()
export class Lessons {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'char' })
  status: 1 | 0;

  @Column({ type: 'varchar' })
  date: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @OneToMany(() => Teachers, (teacher) => teacher.lesson)
  teacher: Teachers[];

  @OneToMany(() => Lessons_students, (attendance) => attendance.lesson)
  attendances?: Lessons_students[];
}
