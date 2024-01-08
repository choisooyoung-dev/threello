import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  // 댓글 생성
  async create(createCommentDto: CreateCommentDto) {
    const { content } = createCommentDto;
    const newComment = await this.commentRepository.save({ content });
    return newComment;
  }

  // 댓글 조회
  async findAll() {
    const findAllComments = await this.commentRepository.find();
    return findAllComments;
  }

  // 특정 댓글 조회
  async findOne(id: number) {
    const findOndComment = await this.commentRepository.findOneBy({ id });
    return findOndComment;
  }

  // 댓글 수정
  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  // 댓글 삭제
  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
