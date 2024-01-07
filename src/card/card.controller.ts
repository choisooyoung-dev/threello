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
  async create(@Body() createCardDto: CreateCardDto) {
    const data = await this.cardService.create(createCardDto);
    return { status: HttpStatus.CREATED, message: '카드 등록 성공', data };
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

  // 모든 카드 가져오기
  @Get()
  async getAllCards() {
    const allCards = await this.cardService.getAllCards();
    return { status: HttpStatus.OK, message: '모든 카드 조회 성공', allCards };
  }

  // 특정 카드 가져오기
  @Get(':id')
  async getCard(@Param('id') id: string) {
    const card = await this.cardService.getCard(+id);
    return { status: HttpStatus.OK, message: '카드 조회 성공', card };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
