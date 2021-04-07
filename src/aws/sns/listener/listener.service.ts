import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AWSError } from 'aws-sdk';
import { SubscribeInput } from 'aws-sdk/clients/sns';
import { v4 } from 'public-ip';
import { ConfirmHandlerService } from '../handlers/confirm-handler/confirm-handler.service';
import { NotificationHandlerService } from '../handlers/notification-handler/notification-handler.service';
import { SnsProviderService } from '../sns-provider/sns-provider.service';
import { Notification } from '../util/notification';
import { NotificationTypes } from '../util/notification-types';

@Injectable()
export class ListenerService {
  constructor(
    private readonly snsProviderService: SnsProviderService,
    private readonly notificationHandler: NotificationHandlerService,
    private readonly confirmationHandler: ConfirmHandlerService,
  ) { }

  private status = 'Not ready';

  getListeningStatus(): string {
    return this.status;
  }

  subscribeToSNS(topicArn: string): void {
    v4().then(ip => {
      const params: SubscribeInput = {
        Protocol: 'http',
        TopicArn: topicArn,
        Endpoint: `http://${ip}/listener`,
      };
      if (process.env.NODE_ENV == 'development') {
        params.Endpoint = `http://${process.env.DEV_ADDR}/listener`;
      }
      this.snsProviderService.getInstance().subscribe(params, (error: AWSError) => {
        if (error) {
          console.log(error, error.stack);
          this.status = 'Error';
        } else {
          console.log('Requested Subscription');
          this.status = 'Pending Confirmation';
        }
      });
    });
  }

  processNotification(message: Notification): string {
    console.log(message);
    switch (message.Type) {
      case NotificationTypes.NOTIFICATION:
        this.notificationHandler.handle(message);
        break;
      case NotificationTypes.SUBSCRIPTION_CONFIRMATION:
        this.confirmationHandler.handle(message);
        break;
      default:
        throw new BadRequestException('Unknown Notification Type');
    }
    return 'done';
  }
}
