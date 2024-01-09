import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateWorkerDto } from './dto/create-woker.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // 카드 생성
  @Post('/create')
  async create(
    @Body('list_id') list_id: number,
    @Body() createCardDto: CreateCardDto,
    @Body('dueTimeValue') dueTimeValue: string,
    @Body('dueDateValue') dueDateValue: string,
  ) {
    const data = await this.cardService.create(
      list_id,
      createCardDto,
      dueDateValue,
      dueTimeValue,
    );
    return data;
  }

  // 카드 삭제
  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    const cards = await this.cardService.remove(+id);
    return cards;
  }

  // 카드 내 작업자 할당
  @Post(':id/worker/create')
  async createWorker(
    @Param('id') cardId: string,
    @Body() createWorkerDto: CreateWorkerDto,
  ) {
    const data = await this.cardService.createWorker(+cardId, createWorkerDto);
    return data;
  }

  // 카드 내 작업자 삭제
  @Delete(':id/worker/remove/:userId')
  async removeWorker(
    @Param('id') cardId: string,
    @Param('userId') userId: string,
  ) {
    const data = await this.cardService.removeWorker(+cardId, +userId);
    return data;
  }

  // 모든 카드 가져오기
  @Get()
  async getAllCards() {
    const cards = await this.cardService.getAllCards();
    return cards;
  }

  // 특정 카드 가져오기
  @Get(':id')
  async getCard(@Param('id') id: string) {
    const card = await this.cardService.getCard(+id);
    return card;
  }

  // 카드 수정
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    const updatedCard = await this.cardService.update(+id, updateCardDto);
    return updatedCard;
  }

  // 카드 순서 변경
  @Patch(':cardId/:to')
  async moveCardBlock(
    @Param('cardId') cardId: string,
    @Param('to') to: string,
  ) {
    const movedCard = await this.cardService.moveCardBlock(+cardId, +to);
    return movedCard;
  }

  // 카드 리스트간 순서 변경
  @Patch(':cardId/:listId/:listTo/:cardTo')
  async moveCardBetweenList(
    @Param('cardId') cardId: string,
    @Param('listId') listId: string,
    @Param('listTo') listTo: string,
    @Param('cardTo') cardTo: string,
  ) {
    const movedCardBetweenList =
      await this.cardService.moveCardBlockBeteweenList(
        +cardId,
        +listId,
        +listTo,
        +cardTo,
      );
    return movedCardBetweenList;
  }
}
