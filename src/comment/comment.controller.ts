import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('/:cardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 생성
  @Post()
  async createComment(
    @Param('cardId') cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentService.createComment(
      createCommentDto,
      cardId,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: '댓글 작성 완료.',
      comment,
    };
  }

  // 댓글 조회
  @Get()
  async getComments(@Param('cardId') cardId: number) {
    const comments = await this.commentService.getComments(cardId);
    return {
      statusCode: HttpStatus.OK,
      message: '전체 댓글 조회 성공.',
      comments,
    };
  }

  // 특정 댓글 가져오기
  @Get(':id')
  async getComment(@Param('cardId') cardId: number, @Param('id') id: string) {
    const comment = await this.commentService.getComment(+id, cardId);
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 조회 완료.',
      comment,
    };
  }

  // 댓글 수정
  @Patch(':id')
  async updateComment(
    @Param('cardId') cardId: number,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updateComment = await this.commentService.updateComment(
      +id,
      updateCommentDto,
      cardId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 수정 완료.',
      updateComment,
    };
  }

  // 댓글 삭제
  @Delete(':id')
  removeComment(@Param('cardId') cardId: number, @Param('id') id: string) {
    const deleteComment = this.commentService.removeComment(+id, cardId);
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 삭제 완료.',
      deleteComment,
    };
  }
}
