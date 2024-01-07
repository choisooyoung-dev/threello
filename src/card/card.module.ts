import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { CardWorker } from './entities/card.worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, CardWorker])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
