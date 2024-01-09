import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { IsNumber } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity('card_workers')
export class CardWorker {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNumber()
  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.cardWorkers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Card, (card) => card.cardWorkers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  card: Card;
}
