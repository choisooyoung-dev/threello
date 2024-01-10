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
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('/:boardId/:card_id/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 생성
  @ApiOperation({
    summary: '댓글 생성 API',
    description: '댓글을 생성 합니다.',
  })
  @Post()
  @ApiBody({ type: CreateCommentDto })
  async createComment(
    @Param('boardId') boardId: number,
    @Param('card_id') card_id: number,
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ) {
    const { id } = user;
    const comment = await this.commentService.createComment(
      createCommentDto,
      boardId,
      card_id,
      +id,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: '댓글 작성 완료.',
      comment,
    };
  }

  // 댓글 조회
  @ApiOperation({
    summary: '전체 댓글 조회 API',
    description: '댓글을 모두 조회합니다.',
  })
  @Get()
  async getComments(
    @Param('boardId') boardId: number,
    @Param('card_id') card_id: number,
  ) {
    const comments = await this.commentService.getComments(boardId, card_id);
    return {
      statusCode: HttpStatus.OK,
      message: '전체 댓글 조회 성공.',
      comments,
    };
  }

  // 특정 댓글 가져오기
  @ApiOperation({
    summary: '특정 댓글 조회 API',
    description: '특정 댓글을 조회합니다.',
  })
  @Get(':id')
  async getComment(
    @Param('boardId') boardId: number,
    @Param('card_id') card_id: number,
    @Param('id') id: number,
  ) {
    const comment = await this.commentService.getComment(+id, boardId, card_id);
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 조회 완료.',
      comment,
    };
  }

  // 댓글 수정
  @ApiOperation({
    summary: '댓글 수정 API',
    description: '댓글을 수정합니다.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateCommentDto })
  async updateComment(
    @Param('boardId') boardId: number,
    @Param('card_id') card_id: number,
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ) {
    const userId = user.id;
    const updateComment = await this.commentService.updateComment(
      +id,
      updateCommentDto,
      boardId,
      card_id,
    );
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 수정 완료.',
      updateComment,
    };
  }

  // 댓글 삭제
  @ApiOperation({
    summary: '댓글 삭제 API',
    description: '댓글을 삭제합니다.',
  })
  @Delete(':id')
  removeComment(
    @Param('boardId') boardId: number,
    @Param('card_id') card_id: number,
    @Param('id') id: number,
  ) {
    const deleteComment = this.commentService.removeComment(
      +id,
      boardId,
      card_id,
    );
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 삭제 완료.',
      deleteComment,
    };
  }
}
