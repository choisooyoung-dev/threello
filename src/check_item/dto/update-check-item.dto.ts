import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCheckItemDto } from './create-check-item.dto';

export class UpdateCheckItemDto extends PartialType(CreateCheckItemDto) {
  @IsString()
  @IsNotEmpty({ message: '타이틀을 입력해주세요.' })
  content: string;
}
