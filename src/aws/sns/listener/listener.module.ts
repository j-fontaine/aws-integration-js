import { Module, HttpModule } from '@nestjs/common';
import { ConfirmHandlerService } from '../handlers/confirm-handler/confirm-handler.service';
import { HandlersModule } from '../handlers/handlers.module';
import { NotificationHandlerService } from '../handlers/notification-handler/notification-handler.service';
import { SnsProviderService } from '../sns-provider/sns-provider.service';
import { ListenerController } from './listener.controller';
import { ListenerService } from './listener.service';

@Module({
  imports: [HttpModule, HandlersModule],
  controllers: [ListenerController],
  providers: [ListenerService, NotificationHandlerService, ConfirmHandlerService, SnsProviderService],
})
export class ListenerModule { }
