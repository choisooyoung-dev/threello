import { IsBoolean, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Board } from './board.entity';
import { User } from '../../user/entities/user.entity';

@Entity('board_members')
export class BoardMember {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ default: true })
  is_accept: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column()
  is_host: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Board, (boards) => boards.boardMembers)
  board: Board;

  @ManyToOne(() => User, (user) => user.boardMembers)
  user: User;
}
