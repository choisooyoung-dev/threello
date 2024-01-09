import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CheckItemService } from './check_item.service';
import { CreateCheckItemDto } from './dto/create-check-item.dto';
import { UpdateCheckItemDto } from './dto/update-check-item.dto';
import { CheckListService } from '../checklist/checklist.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('check-item')
@Controller('check-item')
export class CheckItemController {
  constructor(
    private readonly checkItemService: CheckItemService,
    private readonly checkListService: CheckListService,
  ) {}

  @Post()
  async create(@Body() createCheckItemDto: CreateCheckItemDto) {
    await this.checkListService.findOne(createCheckItemDto.checklist_id);
    const listCount = await this.checkItemService.count(
      createCheckItemDto.checklist_id,
    );
    return await this.checkItemService.create(
      createCheckItemDto,
      Number(listCount.total_list_count) + 1,
    );
  }
  // 전체보기는 보드보기에 딸려서 이미 실행될거같음 일단 기재
  @Get('all/:checklist_id')
  async findAll(@Param('checklist_id') checklist_id: number) {
    return await this.checkItemService.findAll(checklist_id);
  }

  @Get(':itemId')
  async findOne(@Param('itemId') id: number) {
    return await this.checkItemService.findOne(+id);
  }

  @Patch(':itemId')
  async update(
    @Param('itemId') id: number,
    @Body() updateCheckItemListDto: UpdateCheckItemDto,
  ) {
    return await this.checkItemService.update(+id, updateCheckItemListDto);
  }

  @Patch(':itemId/:to')
  async moveListBlock(@Param('itemId') id: number, @Param('to') to: number) {
    return await this.checkItemService.moveCheckItemBlock(+id, to);
  }

  @Delete(':itemId')
  async remove(@Param('itemId') id: string) {
    return await this.checkItemService.remove(+id);
  }
}
