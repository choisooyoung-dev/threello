import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  // 새 보드 생성
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const newBoard = this.boardRepository.create(createBoardDto);
    await this.boardRepository.save(newBoard);
    return newBoard;
  }

  // 전체 보드 목록 조회
  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  // ID를 기반으로 특정 보드 조회
  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException(`해당 보드를 찾을 수 없습니다.`);
    }
    return board;
  }

  // 보드 수정
  async updateBoard(
    id: number,
    updateBoardDto: CreateBoardDto,
  ): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException(`해당 보드를 찾을 수 없습니다.`);
    }

    Object.assign(board, updateBoardDto);
    await this.boardRepository.save(board);
    return board;
  }

  // 보드 삭제
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(` 해당 보드를 찾을 수 없습니다.`);
    }
  }
}
