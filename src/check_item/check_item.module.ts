import { Module } from '@nestjs/common';
import { CheckItemService } from './check_item.service';
import { CheckItemController } from './check_item.controller';

@Module({
  providers: [CheckItemService],
  controllers: [CheckItemController]
})
export class CheckItemModule {}
