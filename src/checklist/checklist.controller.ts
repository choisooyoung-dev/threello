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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('checklist')
@Controller('checklist')
export class CheckListController {
  constructor(
    private readonly checkListService: CheckListService,
    private readonly cardService: CardService,
  ) {}

  @ApiOperation({
    summary: '체크리스트 생성 API',
    description: '체크리스트를 생성합니다.',
  })
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
  @ApiOperation({
    summary: '체크리스트 모두 조회 API',
    description: '카드 ID를 통해 특정 카드의 체크리스트를 모두 조회 합니다.',
  })
  @Get('all/:card_id')
  async findAll(@Param('card_id') card_id: number) {
    return await this.checkListService.findAll(card_id);
  }

  @ApiOperation({
    summary: '특정 체크리스트 조회 API',
    description: '체크리스트 ID를 통해 특정 체크리스트를 조회합니다.',
  })
  @Get(':listId')
  async findOne(@Param('listId') id: number) {
    return await this.checkListService.findOne(+id);
  }

  @ApiOperation({
    summary: '체크리스트 수정 API',
    description: '체크리스트를 수정합니다.',
  })
  @Patch(':listId')
  async update(
    @Param('listId') id: number,
    @Body() updateCheckListDto: UpdateCheckListDto,
  ) {
    return await this.checkListService.update(+id, updateCheckListDto);
  }

  @ApiOperation({
    summary: '체크리스트 이동 API',
    description: '체크리스트를 이동합니다.',
  })
  @Patch(':listId/:to')
  async moveListBlock(@Param('listId') id: number, @Param('to') to: number) {
    return await this.checkListService.moveCheckListBlock(+id, to);
  }

  @ApiOperation({
    summary: '체크리스트 삭제 API',
    description: '체크리스트를 삭제합니다.',
  })
  @Delete(':listId')
  async remove(@Param('listId') id: string) {
    return await this.checkListService.remove(+id);
  }
}
