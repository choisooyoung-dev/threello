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
import { BoardService } from 'src/board/board.service';

@ApiTags('comment')
@Controller(':board_id/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly boardService: BoardService,
  ) {}

  // 댓글 생성
  @Post()
  async createComment(
    @Param('board_id') board_id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentService.createComment(
      createCommentDto,
      board_id,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: '댓글 작성 완료.',
      comment,
    };
  }

  // 댓글 조회
  @Get()
  async getComments(@Param('board_id') board_id: number) {
    const comments = await this.commentService.getComments(board_id);
    return {
      statusCode: HttpStatus.OK,
      message: '전체 댓글 조회 성공.',
      comments,
    };
  }

  // 특정 댓글 가져오기
  @Get(':id')
  async getComment(
    @Param('board_id') board_id: number,
    @Param('id') id: string,
  ) {
    const comment = await this.commentService.getComment(+id, board_id);
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 조회 완료.',
      comment,
    };
  }

  // 댓글 수정
  @Patch(':id')
  async updateComment(
    @Param('board_id') board_id: number,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updateComment = await this.commentService.updateComment(
      +id,
      updateCommentDto,
      board_id,
    );
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 수정 완료.',
      updateComment,
    };
  }

  // 댓글 삭제
  @Delete(':id')
  removeComment(@Param('board_id') board_id: number, @Param('id') id: string) {
    const deleteComment = this.commentService.removeComment(+id, board_id);
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 삭제 완료.',
      deleteComment,
    };
  }
}
