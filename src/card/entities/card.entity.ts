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
import { Color } from 'src/common/types/color.type';
import { CardWorker } from './card.worker.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { DeadlineStatus } from '../types/deadline.status.type';
import { CheckList } from '../../checklist/entities/checklist.entity';

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

  @IsOptional()
  @Column({ nullable: true })
  dueDate?: Date;

  @IsOptional()
  @Column({ type: 'enum', enum: DeadlineStatus, nullable: true })
  deadlineStatus?: DeadlineStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];

  @OneToMany(() => CardWorker, (cardWorker) => cardWorker.card)
  cardWorkers: CardWorker[];

  @OneToMany(() => CheckList, (checklist) => checklist.card)
  checklist: CheckList[];

  @ManyToOne(() => List, (list) => list.card, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  list: List;
}
