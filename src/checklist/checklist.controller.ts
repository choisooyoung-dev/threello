import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckListService } from './checklist.service';
import { CreateCheckListDto } from './dto/create-checklist.dto';
import { UpdateCheckListDto } from './dto/update-checklist.dto';
import { CardService } from '../card/card.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('checklist')
@Controller('checklist')
export class CheckListController {
  constructor(
    private readonly checkListService: CheckListService,
    private readonly cardService: CardService,
  ) {}

  @Post()
  async create(@Body() createCheckListDto: CreateCheckListDto) {
    await this.cardService.getCard(createCheckListDto.card_id);
    const listCount = await this.checkListService.count(
      createCheckListDto.card_id,
    );
    return await this.checkListService.create(
      createCheckListDto,
      Number(listCount.total_list_count) + 1,
    );
  }
  // 전체보기는 보드보기에 딸려서 이미 실행될거같음 일단 기재
  @Get('all/:card_id')
  async findAll(@Param('card_id') card_id: number) {
    return await this.checkListService.findAll(card_id);
  }

  @Get(':listId')
  async findOne(@Param('listId') id: number) {
    return await this.checkListService.findOne(+id);
  }

  @Patch(':listId')
  async update(
    @Param('listId') id: number,
    @Body() updateCheckListDto: UpdateCheckListDto,
  ) {
    return await this.checkListService.update(+id, updateCheckListDto);
  }

  @Patch(':listId/:to')
  async moveListBlock(@Param('listId') id: number, @Param('to') to: number) {
    return await this.checkListService.moveCheckListBlock(+id, to);
  }

  @Delete(':listId')
  async remove(@Param('listId') id: string) {
    return await this.checkListService.remove(+id);
  }
}
