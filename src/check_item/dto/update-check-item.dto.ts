import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { CreateCheckItemDto } from './create-check-item.dto';

export class UpdateCheckItemDto extends PartialType(CreateCheckItemDto) {
  @IsString()
  @IsNotEmpty({ message: '컨텐츠를 입력해주세요.' })
  content: string;

  @IsBoolean()
  @IsNotEmpty({ message: '상태를 입력해주세요' })
  is_done: boolean;
}
