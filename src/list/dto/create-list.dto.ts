import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @IsNumber()
  @ApiProperty({ description: '보드아이디(참조)', example: '1' })
  @IsNotEmpty({ message: '보드 아이디를 입력해주세요.' })
  boards_id: number;

  @IsString()
  @ApiProperty({ description: '리스트 타이틀', example: 'Todo' })
  @IsNotEmpty({ message: '타이틀을 입력해주세요.' })
  title: string;
}
