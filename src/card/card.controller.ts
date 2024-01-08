import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateWorkerDto } from './dto/create-woker.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // 카드 생성
  @Post('/create')
  async create(
    @Body() createCardDto: CreateCardDto,
    @Body('dueTimeValue') dueTimeValue: string,
    @Body('dueDateValue') dueDateValue: string,
  ) {
    const data = await this.cardService.create(
      createCardDto,
      dueDateValue,
      dueTimeValue,
    );
    return { status: HttpStatus.CREATED, message: '카드 등록 성공', data };
  }

  // 카드 삭제
  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    const cards = await this.cardService.remove(+id);
    return { status: HttpStatus.OK, message: '카드 삭제 성공', cards };
  }

  // 카드 내 작업자 할당
  @Post(':id/worker/create')
  async createWorker(
    @Param('id') cardId: string,
    @Body() createWorkerDto: CreateWorkerDto,
  ) {
    const data = await this.cardService.createWorker(+cardId, createWorkerDto);
    return { status: HttpStatus.CREATED, message: '작업자 할당 성공', data };
  }

  // 카드 내 작업자 삭제
  @Delete(':id/worker/remove/:userId')
  async removeWorker(
    @Param('id') cardId: string,
    @Param('userId') userId: string,
  ) {
    const data = await this.cardService.removeWorker(+cardId, +userId);
    return { status: HttpStatus.OK, message: '작업자 삭제 성공', data };
  }

  // 모든 카드 가져오기
  @Get()
  async getAllCards() {
    const cards = await this.cardService.getAllCards();
    return { status: HttpStatus.OK, message: '모든 카드 조회 성공', cards };
  }

  // 특정 카드 가져오기
  @Get(':id')
  async getCard(@Param('id') id: string) {
    const card = await this.cardService.getCard(+id);
    return { status: HttpStatus.OK, message: '카드 조회 성공', card };
  }

  // 카드 수정
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    const updatedCard = await this.cardService.update(+id, updateCardDto);
    return { status: HttpStatus.OK, message: '카드 수정 성공', updatedCard };
  }

  // 카드 순서 변경
  @Patch(':cardId/:to')
  async moveCardBlock(
    @Param('cardId') cardId: string,
    @Param('to') to: string,
  ) {
    const movedCard = await this.cardService.moveCardBlock(+cardId, +to);
    return { status: HttpStatus.OK, message: '카드 순서 변경 성공', movedCard };
  }

  // 카드 리스트간 이동
  @Patch(':cardId/:listId/:toWithListOrder/:toWithCardOrder')
  async moveCardBetweenList(
    @Param('cardId') cardId: string,
    @Param('listId') listId: string,
    @Param('to') to: string,
  ) {
    const moveCard = await this.cardService.moveCardBetweenList(
      +cardId,
      +listId,
      +to,
    );
    return {
      status: HttpStatus.OK,
      message: '카드 리스트 변경 성공',
      moveCard,
    };
  }
}
