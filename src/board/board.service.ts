import {
  ConflictException,
  Injectable,
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
      throw new NotFoundException('해당 보드를 찾을 수 없습니다.');
    }
    return board;
  }

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
      throw new NotFoundException('해당 보드를 찾을 수 없습니다.');
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
      throw new NotFoundException('해당 보드를 찾을 수 없습니다.');
    }
  }

  async invite(boardId: number, userId: number, email: string, user: User) {
    try {
      const board: Board = await this.getBoardById(boardId);
      this.checkBoardExistence(board);
      await this.checkUserIsHost(board, user);
      const invitedUser: User = await this.getUserByEmail(email);
      this.checkUserExistence(invitedUser);
      await this.checkUserNotInBoard(invitedUser, board);

      const isUserHost = board.boardMembers.some(
        (member) => member.user.id === userId && member.is_host,
      );
      if (!isUserHost) {
        throw new UnauthorizedException('초대 권한이 없습니다.');
      }

      const result = await this.addUserToBoard(invitedUser, board);
      console.log(result.created_at);
    } catch (error) {
      throw error;
    }
    return { code: 201, message: 'you successfully invite user' };
  }

  private checkBoardExistence(board: Board): void {
    if (!board) {
      throw new NotFoundException(`id with ${board.id} board isn't exist`);
    }
  }

  private async checkUserIsHost(
    board: Board,
    user: User,
  ): Promise<BoardMember> {
    const result = await this.boardMemberRepository.findOne({
      where: { board, user },
    });

    if (!result || result.is_host == false) {
      throw new UnauthorizedException("you aren't host in the board");
    }

    return result;
  }

  private async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  private checkUserExistence(user: User): void {
    if (!user) {
      throw new NotFoundException(`user doesn't exist`);
    }
  }

  private async checkUserNotInBoard(user: User, board: Board): Promise<void> {
    const boardMember = await this.boardMemberRepository.findOneBy({
      user,
      board,
    });
    if (boardMember) {
      throw new ConflictException(
        'the user you invite is already in the board',
      );
    }
  }

  private async addUserToBoard(user: User, board: Board): Promise<BoardMember> {
    const boardMember = this.boardMemberRepository.create({
      is_accept: false,
      is_host: false,
      user,
      board,
    });

    await this.boardMemberRepository.save(boardMember);
    return boardMember;
  }
}
