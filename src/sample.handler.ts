import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SampleCommand } from './sample.command';
import { SampleEvent } from './sample.event';

@CommandHandler(SampleCommand)
export class SampleHandler implements ICommandHandler<SampleCommand> {
  constructor(private eventBus: EventBus) {}
  async execute(command: SampleCommand): Promise<any> {
    this.eventBus.publish(new SampleEvent(command.requestId));
  }
}
