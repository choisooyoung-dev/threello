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
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('list')
export class ListController {
  // 하단에 board_users 서비스 권한이 추가되어야함
  constructor(private readonly listService: ListService) {}

  @Post()
  async create(@Body() createListDto: CreateListDto) {
    // user가 칸반보드 리스트 권한이 있는지 확인
    // user.id가 board_users 테이블 내 kanban_boards_id&&user_id 값이 일치하게 존재해야함
    // const checkUserRight = this.listService.findOne(createListDto.kanban_boards_id)
    // if(!checkUserRight.length) {
    //   throw new BadRequestException('작성 권한이 없습니다.');
    // }

    // 현재 칸반보드에 리스트 개수를 모두 세서 +1하고 order 반환
    const listCount = await this.listService.count(
      createListDto.kanban_boards_id,
    );
    return await this.listService.create(
      createListDto,
      Number(listCount.total_list_count) + 1,
    );
  }
  // 전체보기는 보드보기에 딸려서 이미 실행될거같음 일단 기재
  @Get('all/:kanban_boards_id')
  async findAll(@Param('kanban_boards_id') kanban_boards_id: number) {
    // user가 칸반보드 리스트 권한이 있는지 확인
    // user.id가 board_users 테이블 내 kanban_boards_id&&user_id 값이 일치하게 존재해야함
    // const checkUserRight = this.listService.findOne(createListDto.kanban_boards_id)
    // if(!checkUserRight.length) {
    //   throw new BadRequestException('열람 권한이 없습니다.');
    // }
    return await this.listService.findAll(kanban_boards_id);
  }

  @Get(':listId')
  async findOne(@Param('listId') id: number) {
    // user가 칸반보드 리스트 권한이 있는지 확인
    // user.id가 board_users 테이블 내 kanban_boards_id&&user_id 값이 일치하게 존재해야함
    // const checkUserRight = this.listService.findOne(createListDto.kanban_boards_id)
    // if(!checkUserRight.length) {
    //   throw new BadRequestException('열람 권한이 없습니다.');
    // }
    return await this.listService.findOne(+id);
  }

  @Patch(':listId')
  async update(
    @Param('listId') id: number,
    @Body() updateListDto: UpdateListDto,
  ) {
    return await this.listService.update(+id, updateListDto);
  }

  @Patch(':listId/:to')
  async moveListBlock(@Param('listId') id: number, @Param('to') to: number) {
    return await this.listService.moveListBlock(+id, to);
  }

  @Delete(':listId')
  async remove(@Param('listId') id: string) {
    return await this.listService.remove(+id);
  }
}
