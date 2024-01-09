import { PickType } from '@nestjs/mapped-types';
import { Card } from '../entities/card.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCardDto extends PickType(Card, [
  'card_order',
  'title',
  'content',
  'color',
  'deadline_status',
]) {
  @IsNotEmpty()
  @IsNumber()
  list_id: number;

  @IsOptional()
  @IsString()
  due_date: string;
}
