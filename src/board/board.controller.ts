import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
}
