import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

import { Card } from '../card/entities/card.entity';
import { CardService } from 'src/card/card.service';
import { CardWorker } from 'src/card/entities/card.worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Card, CardWorker])],
  controllers: [CommentController],
  providers: [CommentService, CardService],
})
export class CommentModule {}
