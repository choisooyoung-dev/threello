import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryColumn()
  id: number;

  @Column()
  card_id: number;

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
  user: User;

  @ManyToOne(() => Card, (card) => card.comments, { onDelete: 'CASCADE' })
  card: Card;
}
