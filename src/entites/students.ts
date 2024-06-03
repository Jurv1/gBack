import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lessons_students } from './lessons_students';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @OneToMany(() => Lessons_students, (attendance) => attendance.students)
  attendances: Lessons_students[];
}
