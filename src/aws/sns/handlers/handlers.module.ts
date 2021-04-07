import { HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfirmHandlerService } from './confirm-handler/confirm-handler.service';
import { NotificationHandlerService } from './notification-handler/notification-handler.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  exports: [],
  providers: [ConfirmHandlerService, NotificationHandlerService],
})
export class HandlersModule {}
