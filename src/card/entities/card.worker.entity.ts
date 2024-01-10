import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';
import { IsNumber } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('card_workers')
export class CardWorker {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNumber()
  @Column()
  @ApiProperty({ description: '유저 아이디', example: '1' })
  user_id: number;

  // 코드 수정한 부분
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
