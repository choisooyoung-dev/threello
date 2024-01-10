import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { Board } from 'src/board/entities/board.entity';
import { Card } from 'src/card/entities/card.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
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

  @ManyToOne(() => Card, (card) => card.comments, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'card_id', referencedColumnName: 'id' }])
  card: Card;
}
