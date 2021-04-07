import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { Notification } from '../../util/notification';

@Injectable()
export class ConfirmHandlerService {
  constructor(private readonly httpService: HttpService) {}

  handle(notification: Notification): void {
    console.log(`Received Subscription Confirmation Message, id=[${notification.MessageId}]`);
    if (!notification.SubscribeURL) {
      throw new NotFoundException('Missing Subscribe Confirmation URL');
    }
    this.callSubscribeURL(notification.SubscribeURL);
  }

  callSubscribeURL(url: string): void {
    console.log(`Invoking SubscribeURL=[${url}]`);
    this.httpService
      .get(url)
      .toPromise()
      .then(subscribeResponse => {
        console.log(JSON.stringify(subscribeResponse.data));
      });
    console.log('Successfully Subscribed to topic');
  }
}
