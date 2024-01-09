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

  @ManyToOne(() => Card, (card) => card.card_workers)
  card: Card;

  @ManyToOne(() => User, (user) => user.cardWorkers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'cardWorker_id', referencedColumnName: 'id' }])
  User: User;

  @ManyToOne(() => Card, (card) => card.cardWorkers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'cardWorker_id', referencedColumnName: 'id' }])
  Card: Card;
}
