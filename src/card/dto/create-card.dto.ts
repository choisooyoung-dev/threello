import { ApiProperty, PickType } from '@nestjs/swagger';
import { Card } from '../entities/card.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDto extends PickType(Card, [
  'card_order',
  'title',
  'content',
  'color',
  'deadline_status',
]) {
  @IsOptional()
  @IsString()
  due_date?: string;

  @IsNotEmpty()
  @ApiProperty({ description: '리스트 아이디', example: undefined })
  list_id: number;
  @IsNotEmpty()
  @ApiProperty({ description: '카드 마감시간', example: undefined })
  dueTimeValue: string;

  @IsNotEmpty()
  @ApiProperty({ description: '카드 마감기한', example: undefined })
  dueDateValue: string;
}
