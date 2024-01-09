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
import { CardService } from 'src/card/card.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly cardService: CardService,
  ) {}

  // 댓글 생성
  async createComment(createCommentDto: CreateCommentDto, cardId) {
    const { content } = createCommentDto;
    if (!content) {
      throw new BadRequestException('댓글을 입력해 주세요.');
    }
    const existCard = await this.cardService.getCard(cardId);
    if (!existCard) {
      throw new NotFoundException('카드가 존재하지 않습니다.');
    }
    const newComment = await this.commentRepository.save({ content });
    return newComment;
  }

  // 댓글 조회
  async getComments(cardId) {
    const existCard = await this.cardService.getCard(cardId);
    if (!existCard) {
      throw new NotFoundException('카드가 존재하지 않습니다.');
    }
    const getAllComments = await this.commentRepository.find();
    return getAllComments;
  }

  // 특정 댓글 조회
  async getComment(id: number, cardId) {
    const existCard = await this.cardService.getCard(cardId);
    if (!existCard) {
      throw new NotFoundException('카드가 존재하지 않습니다.');
    }
    const getComment = await this.commentRepository.findOneBy({ id });
    return getComment;
  }

  // 댓글 수정
  async updateComment(id: number, updateCommentDto: UpdateCommentDto, cardId) {
    const existComment = await this.commentRepository.findOneBy({ id });
    if (!existComment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }
    const existCard = await this.cardService.getCard(cardId);
    if (!existCard) {
      throw new NotFoundException('카드가 존재하지 않습니다.');
    }
    await this.commentRepository.update({ id }, updateCommentDto);
    return this.getComment(id, cardId);
  }

  // 댓글 삭제
  async removeComment(id: number, cardId) {
    const existComment = await this.commentRepository.findOneBy({ id });
    if (!existComment) {
      throw new NotFoundException('댓글이 존재하지 않습니다.');
    }
    const existCard = await this.cardService.getCard(cardId);
    if (!existCard) {
      throw new NotFoundException('카드가 존재하지 않습니다.');
    }
    await this.commentRepository.delete({ id });
    return this.getComments(cardId);
  }
}
