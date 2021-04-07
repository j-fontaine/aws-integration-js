import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Notification } from '../../util/notification';
import { ConfirmHandlerService } from './confirm-handler.service';

describe('ConfirmHandlerService', () => {
  let service: ConfirmHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmHandlerService],
      imports: [Notification, HttpModule],
    }).compile();

    service = module.get<ConfirmHandlerService>(ConfirmHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
