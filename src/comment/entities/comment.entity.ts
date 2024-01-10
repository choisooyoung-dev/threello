import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { Board } from 'src/board/entities/board.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryColumn()
  id: number;

  @Column()
  board_id: number;

  @Column()
  user_id: number;

  @IsNotEmpty({ message: '내용을 입력해 주세요.' })
  @IsString()
  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Board, (board) => board.comments, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  board: Board;
}
