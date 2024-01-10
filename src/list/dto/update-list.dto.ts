import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateListDto } from './create-list.dto';

export class UpdateListDto extends PartialType(CreateListDto) {
  @IsString()
  @IsNotEmpty({ message: '타이틀을 입력해주세요.' })
  title: string;
}
