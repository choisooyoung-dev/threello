import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('boards')
@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  // 새 보드 생성
  // 칸반보드 만들시 바로 칸반보드사용유저 만들어서 호스트로 등록해두기
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardService.createBoard(createBoardDto);
  }

  // 전체 보드 목록 조회
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllBoards(): Promise<Board[]> {
    return await this.boardService.getAllBoards();
  }

  // ID를 기반으로 특정 보드 조회
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return await this.boardService.getBoardById(id);
  }

  // 보드 수정도 호스트만 가능하게
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateBoard(
    @Param('id') id: number,
    @Body() updateBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return await this.boardService.updateBoard(id, updateBoardDto);
  }

  // 보드 삭제 고쳐야 한다. 이건 누구나 지울 수 있다.
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteBoard(@Param('id') id: number): Promise<void> {
    await this.boardService.deleteBoard(id);
  }

  //보드 내에서 초대가 가능하게
  //초대를 어떻게 받아야할까? 백엔드만 있다. 초대를 어떻게 수락하지
  //param 보드ID받고 body 상대 이메일 받고 그냥 추가.
  //이미 초대되어있거나 멤버라면?

  @UseGuards(AuthGuard('jwt'))
  @Post('/:boardId')
  @UsePipes(ValidationPipe)
  async invite(
    @Param('boardId') boardId: number,
    @Body('email') email: string,
    @GetUser() user: User,
  ) {
    await this.boardService.invite(boardId, email, user);
  }
}
