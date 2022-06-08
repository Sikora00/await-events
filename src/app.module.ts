import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleProcessSubscriber } from './sample-process.subscriber';
import { SampleEventHandler } from './sample.event-handler';
import { SampleHandler } from './sample.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [
    AppService,
    SampleEventHandler,
    SampleHandler,
    SampleProcessSubscriber,
  ],
})
export class AppModule {}
