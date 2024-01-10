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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardService } from 'src/board/board.service';
import { Comment } from './entities/comment.entity';
//TODO: 다시봐야함.
@ApiTags('comment')
@Controller(':board_id/comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly boardService: BoardService,
  ) {}

  // 댓글 생성
  @ApiOperation({
    summary: '댓글 생성 API',
    description: '댓글을 생성 합니다.',
  })
  @Post()
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    type: Comment,
    schema: {
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: '댓글 작성 완료' },
      },
    },
  })
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
  @ApiResponse({
    type: Comment,
    schema: {
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: '댓글 작성 완료' },
      },
    },
  })
  @ApiOperation({
    summary: '전체 댓글 조회 API',
    description: '댓글을 모두 조회합니다.',
  })
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
  @ApiOperation({
    summary: '특정 댓글 조회 API',
    description: '특정 댓글을 조회합니다.',
  })
  @ApiResponse({
    type: Comment,
    schema: {
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: '댓글 작성 완료' },
      },
    },
  })
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
  @ApiOperation({
    summary: '댓글 수정 API',
    description: '댓글을 수정합니다.',
  })
  @Patch(':id')
  @ApiResponse({
    type: Comment,
    schema: {
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: '댓글 작성 완료' },
      },
    },
  })
  @ApiBody({ type: UpdateCommentDto })
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
  @ApiOperation({
    summary: '댓글 삭제 API',
    description: '댓글을 삭제합니다.',
  })
  @ApiResponse({
    type: Comment,
    isArray: true,
    schema: {
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: '댓글 작성 완료' },
      },
    },
  })
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
