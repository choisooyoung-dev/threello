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

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 생성
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    const data = await this.commentService.create(createCommentDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '댓글 작성 완료.',
      data,
    };
  }

  // 댓글 조회
  @Get()
  async findAll() {
    const comments = await this.commentService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: '전체 댓글 조회 성공.',
      comments,
    };
  }

  // 특정 댓글 가져오기
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const comment = await this.commentService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 조회 완료.',
      comment,
    };
  }

  // 댓글 수정
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updateComment = await this.commentService.update(
      +id,
      updateCommentDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 수정 완료.',
      updateComment,
    };
  }

  // 댓글 삭제
  @Delete(':id')
  remove(@Param('id') id: string) {
    const deleteComment = this.commentService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: '댓글 삭제 완료.',
      deleteComment,
    };
  }
}
