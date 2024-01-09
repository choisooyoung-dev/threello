import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { List } from '../../list/entities/list.entity';
<<<<<<< HEAD
import { Color } from '../../common/types/color.type';
import { Comment } from '../../comment/entities/comment.entity';
=======
import { Color } from 'src/common/types/color.type';
import { CardWorker } from './card.worker.entity';
import { Comment } from 'src/comment/entities/comment.entity';
>>>>>>> 87b445d22a6b7a1fb0d0ebe367f77fe62821b855

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column()
  listId: number;

  @IsOptional()
  @IsNumber()
  @Column()
  cardOrder?: number;

  @IsNotEmpty({ message: '카드 제목을 입력해주세요.' })
  @IsString()
  @Column()
  title: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  content?: string;

  @IsOptional()
  @IsString()
  @Column({ type: 'enum', enum: Color, nullable: true })
  color?: Color;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];

  @OneToMany(() => CardWorker, (cardWorker) => cardWorker.card)
  cardWorkers: CardWorker[];

  @ManyToOne(() => List, (list) => list.card, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  list: List;

  @OneToMany(() => Comment, (Comment) => Comment.card)
  comments: Comment[];
}
