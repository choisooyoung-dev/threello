import { Entity, Column, JoinColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Board } from '../../board/entities/board.entity';
import { Card } from '../../card/entities/card.entity';

@Entity('lists')
export class List {
  @Column('int', { primary: true, name: 'id', comment: 'PK, AUTO_INCREMENT' })
  id: number;

  // @ManyToOne((type) => Board, (board) => board.lists, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinColumn([{ name: 'kanban_boards_id', referencedColumnName: 'id' }])
  // board: Board;

  @Column('int', { name: 'kanban_boards_id', comment: 'FK' })
  kanbanBoardsId: number;

  @Column('int', { name: 'lists_order', comment: '기존Lits개수세서 +1' })
  listsOrder: number;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @CreateDateColumn()
  @Column('date', { name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn()
  @Column('date', { name: 'updated_at' })
  updatedAt: string;

  // @OneToMany(() => Card, (card) => card.liusts)
  // card: Card[];
}
