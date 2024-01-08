import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  // 새 보드 생성
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardService.createBoard(createBoardDto);
  }

  // 전체 보드 목록 조회
  @Get()
  async getAllBoards(): Promise<Board[]> {
    return await this.boardService.getAllBoards();
  }

  // ID를 기반으로 특정 보드 조회
  @Get(':id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return await this.boardService.getBoardById(id);
  }

  // 보드 수정
  @Patch(':id')
  async updateBoard(
    @Param('id') id: number,
    @Body() updateBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return await this.boardService.updateBoard(id, updateBoardDto);
  }

  // 보드 삭제
  @Delete(':id')
  async deleteBoard(@Param('id') id: number): Promise<void> {
    await this.boardService.deleteBoard(id);
  }
}
