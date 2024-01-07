import { PickType } from '@nestjs/mapped-types';
import { Card } from '../entities/card.entity';

export class CreateCardDto extends PickType(Card, [
  'columnId',
  'cardOrder',
  'title',
  'content',
  'color',
]) {}
