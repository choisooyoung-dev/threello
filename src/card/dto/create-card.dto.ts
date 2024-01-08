import { PickType } from '@nestjs/mapped-types';
import { Card } from '../entities/card.entity';

export class CreateCardDto extends PickType(Card, [
  'listId',
  'cardOrder',
  'title',
  'content',
  'color',
]) {}
