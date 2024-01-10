import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { BoardService } from 'src/board/board.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly boardService: BoardService,
  ) {}

  // 댓글 생성
  async createComment(createCommentDto: CreateCommentDto, board_id) {
    const { content } = createCommentDto;
    if (!content) {
      throw new BadRequestException('댓글을 입력해 주세요.');
    }
    const existBoard = await this.boardService.getBoardById(board_id);
    if (!existBoard) {
      throw new NotFoundException('보드가 존재하지 않습니다.');
    }
    const newComment = await this.commentRepository.save({ content });
    return newComment;
  }

  // 댓글 조회
  async getComments(board_id) {
    const existBoard = await this.boardService.getBoardById(board_id);
    if (!existBoard) {
      throw new NotFoundException('보드가 존재하지 않습니다.');
    }
    const getAllComments = await this.commentRepository.find({
      order: { created_at: 'DESC' },
    });
    return getAllComments;
  }

  // 특정 댓글 조회
  async getComment(id: number, board_id) {
    const existBoard = await this.boardService.getBoardById(board_id);
    if (!existBoard) {
      throw new NotFoundException('보드가 존재하지 않습니다.');
    }
    const getComment = await this.commentRepository.findOneBy({ id });
    return getComment;
  }

  // 댓글 수정
  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
    board_id,
  ) {
    const existComment = await this.commentRepository.findOneBy({ id });
    if (!existComment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }
    const existBoard = await this.boardService.getBoardById(board_id);
    if (!existBoard) {
      throw new NotFoundException('보드가 존재하지 않습니다.');
    }
    await this.commentRepository.update({ id }, updateCommentDto);
    return this.getComment(id, board_id);
  }

  // 댓글 삭제
  async removeComment(id: number, board_id) {
    const existComment = await this.commentRepository.findOneBy({ id });
    if (!existComment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }
    const existBoard = await this.boardService.getBoardById(board_id);
    if (!existBoard) {
      throw new NotFoundException('보드가 존재하지 않습니다.');
    }
    await this.commentRepository.delete({ id });
    return this.getComments(board_id);
  }
}
