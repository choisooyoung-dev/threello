import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { BoardService } from '../board/board.service';
import { Board } from '../board/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, Board])],
  providers: [ListService, BoardService],
  controllers: [ListController],
})
export class ListModule {}
