import { PickType } from '@nestjs/mapped-types';
import { Card } from '../entities/card.entity';
import { IsOptional, IsString } from 'class-validator';

export class CreateCardDto extends PickType(Card, [
  'listId',
  'cardOrder',
  'title',
  'content',
  'color',
  'deadlineStatus',
]) {
  @IsOptional()
  @IsString()
  dueDate: string;
}
