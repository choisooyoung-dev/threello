import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { List } from '../../list/entities/list.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: '보드명을 입력해 주세요.' })
  @IsString()
  @Column()
  title: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  color?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => List, (list) => list.board)
  list: List[];
}
