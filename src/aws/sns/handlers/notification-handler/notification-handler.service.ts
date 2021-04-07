import { Injectable } from '@nestjs/common';
import { Notification } from '../../util/notification';

@Injectable()
export class NotificationHandlerService {
  handle(notification: Notification): void {
    console.log(`Received Notificaion Message, id=[${notification.MessageId}]`);
    console.log(`Attributes=${JSON.stringify(notification.MessageAttributes)}`);
  }
}
