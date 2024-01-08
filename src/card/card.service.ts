import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CardWorker } from './entities/card.worker.entity';
import { CreateWorkerDto } from './dto/create-woker.dto';
import { DeadlineStatus } from './types/deadline.status.type';
import { Card } from 'src/card/entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    @InjectRepository(CardWorker)
    private cardWorkerRepository: Repository<CardWorker>,
    private readonly dataSource: DataSource,
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existingCard = await this.cardRepository.find({ where: { id } });
      console.log(existingCard);

      if (!existingCard)
        throw new NotFoundException('해당하는 카드가 없습니다.');

      const existingCardOrder = existingCard[0].cardOrder;
      console.log('existingCardOrder: ', existingCardOrder);

      //const listId = existingCard[0].listId;

      const countArr = await this.cardRepository.find();
      console.log('countArr ===> ', countArr);
      const count = countArr.length;
      console.log('count ===> ', count);

      if (count === existingCardOrder) {
        await this.cardRepository.delete({ id });
        return existingCard;
      }
      await this.moveCardBlock(id, count);
      await this.cardRepository.delete({ id });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { status: 404, message: error.message };
    } finally {
      // 사용이 끝난 후에는 항상 queryRunner를 해제
      await queryRunner.release();
    }
  }

  // 카드 순서 변경
  async moveCardBlock(cardId: number, to: number) {
    console.log('to ===> ', to);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 선택된 카드 블록 가져오기
      const cardBlock = await this.cardRepository.find({
        where: { id: cardId },
      });

      if (cardBlock[0].id !== cardId)
        throw new NotFoundException(
          '일치하는 카드 아이디 값의 카드가 없습니다.',
        );

      const allCards = await this.cardRepository.find();

      const cardOrderValues = allCards.map((card) => card.cardOrder);
      console.log('cardOrderValues: ', cardOrderValues);
      if (!cardOrderValues.includes(to))
        throw new NotFoundException('해당하는 위치가 없습니다.');

      console.log('cardBlock===> ', cardBlock);

      console.log(cardBlock[0].cardOrder);
      let max = 0;
      let min = 0;
      if (cardBlock[0].cardOrder > to) {
        max = cardBlock[0].cardOrder;
        min = to;
      } else {
        max = to;
        min = cardBlock[0].cardOrder;
      }

      const currentCards = await this.cardRepository
        .createQueryBuilder('card')
        .where('card.card_order >= :min AND card.card_order <= :max', {
          min: min,
          max: max,
        })
        .getMany();

      console.log(currentCards);

      const direction = to > cardBlock[0].cardOrder ? -1 : 1;

      for (const card of currentCards) {
        card.cardOrder += direction;
      }
      cardBlock[0].cardOrder = to;

      await queryRunner.manager.save(Card, currentCards);
      await queryRunner.manager.save(Card, cardBlock[0]);

      await queryRunner.commitTransaction();
      return cardBlock[0];
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { status: 404, message: error.message };
    } finally {
      // 사용이 끝난 후에는 항상 queryRunner를 해제
      await queryRunner.release();
    }
  }

  // 리스트간 카드 이동
  // async moveCardBetweenList(cardId: number, listId: number, to: number) {
  //   const moveCard = await this.cardRepository.findOne({
  //     where: { id: cardId },
  //     select: ['listId'],
  //   });
  //   console.log(moveCard);
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
