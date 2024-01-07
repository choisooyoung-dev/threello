import { PickType } from '@nestjs/mapped-types';
import { Comment } from '../entities/comment.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto extends PickType(Comment, ['content']) {
  /**
   * 댓글 작성
   */
  @IsNotEmpty({ message: '내용을 입력해 주세요.' })
  @IsString()
  content: string;
}
