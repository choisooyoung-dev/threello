import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { List } from '../../list/entities/list.entity';
import { Color } from 'src/common/types/color.type';
import { CardWorker } from './card.worker.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { DeadlineStatus } from '../types/deadline.status.type';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @IsNumber()
  @Column()
  card_order?: number;

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
  due_date?: Date;

  @IsOptional()
  @Column({ type: 'enum', enum: DeadlineStatus, nullable: true })
  deadline_status?: DeadlineStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];

  @ManyToOne(() => List, (list) => list.card, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'list_id', referencedColumnName: 'id' }])
  list: List;

  @OneToMany(() => CardWorker, (cardWorkers) => cardWorkers.card)
  cardWorkers: CardWorker[];
}
