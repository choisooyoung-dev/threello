import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../board/entities/board.entity';
import { Card } from '../../card/entities/card.entity';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kanban_boards_id: number;

  @Column()
  lists_order: number;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @OneToMany(() => Card, (card) => card.list)
  card: Card[];

  @ManyToOne(() => Board, (board) => board.list, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'kanban_boards_id', referencedColumnName: 'id' }])
  board: Board;
}
