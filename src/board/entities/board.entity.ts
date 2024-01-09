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
import { BoardMember } from './board-member.entity';

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

  @OneToMany(() => BoardMember, (boardMembers) => boardMembers.board) // 보드 멤버와의 일대다 관계 설정
  boardMembers: BoardMember[];
}
