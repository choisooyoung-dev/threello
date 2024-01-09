import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';
import { BoardMember } from '../../board/entities/board-member.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nick: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => BoardMember, (boardMembers) => boardMembers.user)
  boardMembers: BoardMember[];
}
