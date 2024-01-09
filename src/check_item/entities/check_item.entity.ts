import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CheckList } from '../../checklist/entities/checklist.entity';

@Entity('check_item')
export class CheckItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checklist_id: number;

  @Column()
  lists_order: number;

  @Column()
  content: string;

  @Column({ default: false })
  is_done: boolean;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @ManyToOne(() => CheckList, (checklist) => checklist.check_item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'checklist_id', referencedColumnName: 'id' }])
  checklist: CheckList;
}
