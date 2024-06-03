import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teachers } from './teachers';
import { Lessons_students } from './lessons_students';

@Entity()
export class Lessons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'boolean' })
  status: 1 | 0;

  @Column({ type: 'varchar' })
  date: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ManyToMany(() => Teachers, (teacher) => teacher.lessons, { cascade: true })
  @JoinTable()
  teachers: Teachers[];

  @OneToMany(
    () => Lessons_students,
    (lessonsStudents) => lessonsStudents.lesson,
  )
  students: Lessons_students[];
}
