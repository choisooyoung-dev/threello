import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { BoardMember } from './entities/board-member.entity';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(BoardMember)
    private boardMemberRepository: Repository<BoardMember>,
    private userRepository: UserRepository,
  ) {}

  // 새 보드 생성
  async createBoard(
    createBoardDto: CreateBoardDto,
    userId: number,
  ): Promise<Board> {
    const newBoard = this.boardRepository.create(createBoardDto);
    const savedBoard = await this.boardRepository.save(newBoard);

    // 생성한 사용자에게 관리자 권한 부여
    const boardMember = this.boardMemberRepository.create({
      user: { id: userId },
      board: savedBoard,
      is_host: true,
    });
    await this.boardMemberRepository.save(boardMember);

    return savedBoard;
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
    userId: number,
    id: number,
    updateBoardDto: CreateBoardDto,
  ): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['boardMembers'],
    });

    const isUserHost = board.boardMembers.some(
      (member) => member.user.id === userId && member.is_host,
    );

    if (!isUserHost) {
      throw new UnauthorizedException('수정 권한이 없습니다.');
    }

    if (!board) {
      throw new NotFoundException(`해당 보드를 찾을 수 없습니다.`);
    }

    Object.assign(board, updateBoardDto);
    await this.boardRepository.save(board);
    return board;
  }

  // 보드 삭제
  async deleteBoard(
    userId: number, // 사용자 ID 파라미터 추가
    id: number,
  ): Promise<void> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['boardMembers'],
    });

    const isUserHost = board.boardMembers.some(
      (member) => member.user.id === userId && member.is_host,
    );

    if (!isUserHost) {
      throw new UnauthorizedException('삭제 권한이 없습니다.');
    }

    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(` 해당 보드를 찾을 수 없습니다.`);
    }
  }
  //출력되는지 테스트 할 것
  //보드 내에서 초대가 가능하게
  //초대를 어떻게 받아야할까? 백엔드만 있다. 초대를 어떻게 수락하지
  //param 보드ID받고 body 상대 이메일 받고 그냥 추가.
  //이미 초대되어있거나 멤버라면?
  async invite(boardId: number, email: string, user: User) {
    let board: Board;
    let boardMember: BoardMember;
    try {
      board = await this.boardRepository.findOneBy({ id: boardId });
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
    if (!board) {
      throw new NotFoundException("id with ${boardId} board isn't exit");
    }
    let invitedUser: User;
    try {
      invitedUser = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
    if (!invitedUser) {
      throw new NotFoundException(`user with ${email} isn't exit`);
    }
    try {
      boardMember = this.boardMemberRepository.create({
        is_accept: false,
        is_host: false,
        user: invitedUser,
        board,
      });
      await this.boardMemberRepository.save(boardMember);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
    console.log(boardMember);
  }
}
