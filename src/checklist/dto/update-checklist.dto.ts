import { PartialType } from '@nestjs/swagger';
import { CreateCheckListDto } from './create-checklist.dto';

export class UpdateCheckListDto extends PartialType(CreateCheckListDto) {}
