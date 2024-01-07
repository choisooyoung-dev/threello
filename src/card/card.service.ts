import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CardWorker } from './entities/card.worker.entity';
import { CreateWorkerDto } from './dto/create-woker.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    @InjectRepository(CardWorker)
    private cardWorkerRepository: Repository<CardWorker>,
  ) {}

  // 카드 생성
  async create(createCardDto: CreateCardDto) {
    const { columnId, color, title, content } = createCardDto;

    const getAllCards = await this.cardRepository.find();
    //  console.log(allGetCard);

    const cardOrder = getAllCards.length + 1;

    const newCard = await this.cardRepository.save({
      title,
      content,
      columnId,
      cardOrder,
      color,
    });

    return newCard;
  }

  // 모든 카드 조회
  async getAllCards() {
    const getAllCards = await this.cardRepository.find();
    return getAllCards;
  }

  // 특정 카드 조회
  async getCard(id: number) {
    const getCard = await this.cardRepository.findOneBy({ id });
    return getCard;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }

  // 작업자 할당
  async createWorker(cardId: number, createWorkerDto: CreateWorkerDto) {
    const { userIds } = createWorkerDto;
    console.log(' userIds Array ===> ', userIds);
    console.log('card ===> ', cardId);

    const createdWorkers = [];

    for (const user of userIds) {
      // 작업자 중복 체크
      const existingWorker = await this.cardWorkerRepository.findOne({
        where: { userId: user.id, card: { id: cardId } },
      });

      if (!existingWorker) {
        const newWorker = await this.cardWorkerRepository.save({
          userId: user.id,
          card: { id: cardId },
        });
        createdWorkers.push(newWorker);
      }
    }
    return createdWorkers;
  }
}
