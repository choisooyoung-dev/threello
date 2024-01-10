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
import { BoardService } from '../board/board.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('list')
@Controller('list')
export class ListController {
  // 하단에 board_users 서비스 권한이 추가되어야함
  constructor(
    private readonly listService: ListService,
    private readonly boardService: BoardService,
  ) {}

  @ApiOperation({
    summary: '리스트 생성 API',
    description: '리스트를 생성합니다.',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateListDto })
  @Post()
  async create(@Body() createListDto: CreateListDto) {
    await this.boardService.getBoardById(createListDto.boards_id);
    const listCount = await this.listService.count(createListDto.boards_id);
    return await this.listService.create(
      createListDto,
      Number(listCount.total_list_count) + 1,
    );
  }
  // 전체보기는 보드보기에 딸려서 이미 실행될거같음 일단 기재
  @ApiOperation({
    summary: '특정 보드의 모든 리스트 조회 API',
    description: '보드 ID를 통해 특정 보드의 모든 리스트를 조회합니다.',
  })
  @ApiBearerAuth()
  @Get('all/:boards_id')
  async findAll(@Param('boards_id') boards_id: number) {
    return await this.listService.findAll(boards_id);
  }

  @ApiOperation({
    summary: '특정 리스트 조회 API',
    description: '리스트 ID를 통해 특정 리스트를 조회합니다.',
  })
  @ApiBearerAuth()
  @Get(':listId')
  async findOne(@Param('listId') id: number) {
    return await this.listService.findOne(+id);
  }

  @ApiOperation({
    summary: '리스트 수정 API',
    description: '리스트를 수정합니다.',
  })
  @ApiBearerAuth()
  @Patch(':listId')
  async update(
    @Param('listId') id: number,
    @Body() updateListDto: UpdateListDto,
  ) {
    return await this.listService.update(+id, updateListDto);
  }

  @ApiOperation({
    summary: '리스트 이동 API',
    description: '리스트를 이동합니다.',
  })
  @ApiBearerAuth()
  @Patch(':listId/:to')
  async moveListBlock(@Param('listId') id: number, @Param('to') to: number) {
    return await this.listService.moveListBlock(+id, to);
  }

  @ApiOperation({
    summary: '리스트 삭제 API',
    description: '리스트를 삭제합니다.',
  })
  @ApiBearerAuth()
  @Delete(':listId')
  async remove(@Param('listId') id: string) {
    return await this.listService.remove(+id);
  }
}
