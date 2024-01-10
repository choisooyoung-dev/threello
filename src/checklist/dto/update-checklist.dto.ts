import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCheckListDto } from './create-checklist.dto';

export class UpdateCheckListDto extends PartialType(CreateCheckListDto) {
  @IsString()
  @IsNotEmpty({ message: '타이틀을 입력해주세요.' })
  title: string;
}
