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
import { CardWorker } from './card.worker.entity';
import { cardIndexColor } from '../types/card.color.type';
import { List } from '../../list/entities/list.entity';

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
  @Column({ type: 'enum', enum: cardIndexColor, nullable: true })
  color?: cardIndexColor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CardWorker, (cardWorker) => cardWorker.card)
  cardWorkers: CardWorker[];

  @ManyToOne(() => List, (list) => list.card, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  list: List;
}
