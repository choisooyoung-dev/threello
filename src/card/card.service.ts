import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CardWorker } from './entities/card.worker.entity';
import { CreateWorkerDto } from './dto/create-woker.dto';
import { DeadlineStatus } from './types/deadline.status.type';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    @InjectRepository(CardWorker)
    private cardWorkerRepository: Repository<CardWorker>,
  ) {}

  // 카드 생성
  async create(
    createCardDto: CreateCardDto,
    dueDateValue: string,
    dueTimeValue: string,
  ) {
    const { listId, color, title, content, dueDate, deadlineStatus } =
      createCardDto;

    // console.log('dueDateValue ===> ', dueDateValue);
    // console.log('dueTimeValue ====> ', dueTimeValue);

    const getAllCards = await this.cardRepository.find();
    //  console.log(allGetCard);

    const cardOrder = getAllCards.length + 1;

    // 날짜는 입력하고 시간 입력 안해줬을 때
    if (!dueTimeValue) dueTimeValue = '00:00';

    const dueDateResult = new Date(`${dueDateValue} ${dueTimeValue}`);
    // console.log('dueDateResult: ', dueDateResult);

    const nowDate = new Date();
    // console.log('nowDate ===> ', nowDate);

    const timeDifference = dueDateResult.getTime() - nowDate.getTime();

    const hoursDifference = timeDifference / (1000 * 60 * 60);

    let deadlineStatusValue: DeadlineStatus;

    // 마감기한 넘겼을때
    if (hoursDifference <= 0) {
      deadlineStatusValue = DeadlineStatus.overdue;
    } else if (hoursDifference < 24) {
      // 마감기한 하루 전
      deadlineStatusValue = DeadlineStatus.soon;
    } else {
      // 그 외
      deadlineStatusValue = null;
    }

    const newCard = await this.cardRepository.save({
      title,
      content,
      listId,
      cardOrder,
      color,
      dueDate: dueDateResult,
      deadlineStatus: deadlineStatusValue,
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

  // 카드 수정
  async update(id: number, updateCardDto: UpdateCardDto) {
    const existingCard = await this.cardRepository.findOneBy({ id });
    if (!existingCard) throw new NotFoundException('해당하는 카드가 없습니다.');
    await this.cardRepository.update({ id }, updateCardDto);
    return this.getCard(id);
  }

  // 카드 삭제
  async remove(id: number) {
    const existingCard = await this.cardRepository.findOneBy({ id });
    if (!existingCard) throw new NotFoundException('해당하는 카드가 없습니다.');
    await this.cardRepository.delete({ id });
    return this.getAllCards();
  }

  // async moveCard() {
  //   // 카드 순서 수정

  //       console.log(updateCardDto.cardOrder);
  //       const targetCard = await this.cardRepository.findOneBy({
  //         cardOrder: updateCardDto.cardOrder,
  //       });
  //       console.log('targetCard: ', targetCard);

  //       const selectedCard = await this.cardRepository.findOneBy({ id });
  //       console.log('selectedCard: ', selectedCard);
  // }

  // 작업자 할당
  async createWorker(cardId: number, createWorkerDto: CreateWorkerDto) {
    const { userIds } = createWorkerDto;

    const createdWorkers = [];

    for (const user of userIds) {
      // 작업자 중복 체크
      const existingWorker = await this.cardWorkerRepository.findOne({
        where: { userId: user.id, card: { id: cardId } },
      });

      // 중복된 사람 제외 등록
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

  // 작업자 삭제
  async removeWorker(cardId: number, userId: number) {
    const existingWorker = await this.cardWorkerRepository.findOne({
      where: { userId, card: { id: cardId } },
    });

    if (!existingWorker)
      throw new NotFoundException('해당되는 사용자가 없습니다.');

    const deleteWorker = await this.cardWorkerRepository.delete({
      userId,
    });

    return deleteWorker;
  }
}
