import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';
import { IsNumber } from 'class-validator';

@Entity('cardWorkers')
export class CardWorker {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNumber()
  @Column()
  userId: number;

  @ManyToOne(() => Card, (card) => card.cardWorkers)
  card: Card;
}
