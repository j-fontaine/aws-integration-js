import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmHandlerService } from '../handlers/confirm-handler/confirm-handler.service';
import { HandlersModule } from '../handlers/handlers.module';
import { NotificationHandlerService } from '../handlers/notification-handler/notification-handler.service';
import { SnsProviderService } from '../sns-provider/sns-provider.service';
import { ListenerController } from './listener.controller';
import { ListenerService } from './listener.service';

describe('ListenerService', () => {
  let service: ListenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, HandlersModule],
      controllers: [ListenerController],
      providers: [ListenerService, NotificationHandlerService, ConfirmHandlerService, SnsProviderService],
    }).compile();

    service = module.get<ListenerService>(ListenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
