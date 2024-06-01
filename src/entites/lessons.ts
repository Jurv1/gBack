import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teachers } from './teachers';

@Entity()
export class Lessons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  shortDescription: string;

  @Column({ type: 'varchar', length: 1000 })
  content: string;

  @Column({ type: 'char', default: 0 })
  userStatus: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @OneToMany(() => Teachers, (teacher) => teacher.id)
  teacher: Teachers[];
}
