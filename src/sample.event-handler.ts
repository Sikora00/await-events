import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SampleEvent } from './sample.event';
import { SampleProcessSubscriber } from './sample-process.subscriber';

@EventsHandler(SampleEvent)
export class SampleEventHandler implements IEventHandler<SampleEvent> {
  constructor(private subscriber: SampleProcessSubscriber) {}
  async handle(event: SampleEvent) {
    this.subscriber.finish(event.requestId);
  }
}
