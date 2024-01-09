import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

import { Card } from '../card/entities/card.entity';
import { CardModule } from 'src/card/card.module';
import { CardWorker } from 'src/card/entities/card.worker.entity';

//인터페이스가 있다. 자동차
//중형차 대형차 소형차

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Card, CardWorker]), CardModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
