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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('boards')
@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  // 새 보드 생성
  // 칸반보드 만들시 바로 칸반보드사용유저 만들어서 호스트로 등롥해두기
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardService.createBoard(createBoardDto);
  }

  //보드 내에서 초대가 가능하게
  //초대를 어떻게 받아야할까? 백엔드만 있다. 초대를 어떻게 수락하지

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

  // 보드 수정도 호스트만 가능하게
  @Patch(':id')
  async updateBoard(
    @Param('id') id: number,
    @Body() updateBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return await this.boardService.updateBoard(id, updateBoardDto);
  }

  // 보드 삭제 고쳐야 한다. 이건 누구나 지울 수 있다.
  @Delete(':id')
  async deleteBoard(@Param('id') id: number): Promise<void> {
    await this.boardService.deleteBoard(id);
  }
}
