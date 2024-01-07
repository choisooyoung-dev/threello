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
  @PrimaryColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true })
  cardId: number;

  @Column({ unsigned: true })
  userId: number;

  @IsNotEmpty({ message: '내용을 입력해 주세요.' })
  @IsString()
  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Card, (card) => card.comments, { onDelete: 'CASCADE' })
  card: Card;
}
