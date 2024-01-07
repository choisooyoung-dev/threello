import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { cardIndexColor } from '../types/card.color.type';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  @Column({ type: 'enum', enum: cardIndexColor, nullable: true })
  color?: cardIndexColor;
  @IsString()
  content?: string;
}
