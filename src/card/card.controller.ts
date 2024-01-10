import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateWorkerDto } from './dto/create-woker.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@ApiTags('card')
@UseGuards(AuthGuard('jwt'))
@Controller('/:boardId/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // 카드 생성
  @ApiOperation({
    summary: '카드 생성 API',
    description: '카드를 생성합니다.',
  })
  @Post('/create')
  async create(
    @GetUser() user: User,
    @Body('list_id')
    list_id: number,
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
  @ApiOperation({
    summary: '카드 삭제 API',
    description: '카드를 삭제합니다.',
  })
  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    const cards = await this.cardService.remove(+id);
    return cards;
  }

  // 카드 내 작업자 할당
  @ApiOperation({
    summary: '카드 내 작업자 할당 API',
    description: '카드 내에 해당 작업을 담당하는 작업자를 할당합니다.',
  })
  @Post(':id/worker/create')
  async createWorker(
    @Param('id') cardId: string,
    @Body() createWorkerDto: CreateWorkerDto,
  ) {
    const data = await this.cardService.createWorker(+cardId, createWorkerDto);
    return data;
  }

  // 카드 내 작업자 삭제
  @ApiOperation({
    summary: '카드 내 작업자 삭제 API',
    description: '카드 내에 해당 작업을 담당하는 작업자를 삭제합니다.',
  })
  @Delete(':id/worker/remove/:userId')
  async removeWorker(
    @Param('id') cardId: string,
    @Param('userId') userId: string,
  ) {
    const data = await this.cardService.removeWorker(+cardId, +userId);
    return data;
  }

  // 모든 카드 가져오기
  @ApiOperation({
    summary: '모든 카드 조회 API',
    description: '모든 카드를 조회합니다.',
  })
  @Get('/:listId')
  async getAllCards(
    @Param('listId')
  ) {
    const cards = await this.cardService.getAllCards();
    return cards;
  }

  // 특정 카드 가져오기
  @ApiOperation({
    summary: '특정 카드 조회 API',
    description: '카드 ID를 통해 특정 카드를 조회합니다.',
  })
  @Get(':id')
  async getCard(@Param('id') id: string) {
    const card = await this.cardService.getCard(+id);
    return card;
  }

  // 카드 수정
  @ApiOperation({
    summary: '카드 수정 API',
    description: '카드를 수정합니다.',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    const updatedCard = await this.cardService.update(+id, updateCardDto);
    return updatedCard;
  }

  // 카드 순서 변경
  @ApiOperation({
    summary: '카드 순서 변경 API',
    description: '카드의 순서를 변경합니다.',
  })
  @Patch(':cardId/:to')
  async moveCardBlock(
    @Param('cardId') cardId: string,
    @Param('to') to: string,
  ) {
    const movedCard = await this.cardService.moveCardBlock(+cardId, +to);
    return movedCard;
  }

  // 카드 리스트간 순서 변경
  @ApiOperation({
    summary: '카드 리스트간 순서 변경 API',
    description: '카드 리스트간 순서를 변경합니다.',
  })
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
