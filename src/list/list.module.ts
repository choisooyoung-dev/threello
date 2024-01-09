import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { BoardService } from '../board/board.service';
import { Board } from '../board/entities/board.entity';
import { BoardMember } from 'src/board/entities/board-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, Board, BoardMember])],
  providers: [ListService, BoardService],
  controllers: [ListController],
})
export class ListModule {}
