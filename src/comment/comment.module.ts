import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

import { BoardModule } from 'src/board/board.module';
import { Board } from 'src/board/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Board]), BoardModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
