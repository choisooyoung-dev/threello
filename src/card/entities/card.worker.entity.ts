import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';
import { IsNumber } from 'class-validator';

@Entity('card_workers')
export class CardWorker {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNumber()
  @Column()
  user_id: number;

  @ManyToOne(() => Card, (card) => card.card_workers)
  card: Card;
}
