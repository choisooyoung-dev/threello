import { IsArray } from 'class-validator';

export class CreateWorkerDto {
  @IsArray()
  userIds: { id: number }[];
}
