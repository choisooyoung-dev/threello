import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCheckItemDto {
  @IsNumber()
  @IsNotEmpty({ message: '체크리스트 아이디를 입력해주세요.' })
  checklist_id: number;

  @IsString()
  @IsNotEmpty({ message: '컨텐츠를 입력해주세요.' })
  content: string;
}
