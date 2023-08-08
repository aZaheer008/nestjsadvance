import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaymentFailedEvent } from './events/payment-failed.event';
import { EventContext } from './context/event-context';

@Injectable()
export class NotificationsService {
    constructor(private readonly moduleRef : ModuleRef){}

    @OnEvent(PaymentFailedEvent.key)
    async sendPaymentNotificiation(event : PaymentFailedEvent) {
        const eventContext = await this.moduleRef.resolve(
            EventContext,
            event.meta.contextId
        )
        console.log('Sending a payment notification', eventContext.request.url);
    }
}
