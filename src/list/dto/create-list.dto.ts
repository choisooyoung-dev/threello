import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateListDto {
  @IsNumber()
  @IsNotEmpty({ message: '보드 아이디를 입력해주세요.' })
  boards_id: number;

  @IsString()
  @IsNotEmpty({ message: '타이틀을 입력해주세요.' })
  title: string;
}
