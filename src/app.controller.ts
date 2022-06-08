import { Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Observable, shareReplay, takeUntil, timer } from 'rxjs';
import { AppService } from './app.service';
import { SampleProcessSubscriber } from './sample-process.subscriber';
import { SampleCommand } from './sample.command';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private commandBus: CommandBus,
    private sampleProccess: SampleProcessSubscriber,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  runSomeProcess(): Observable<any> {
    const requestId = Math.random().toString();
    const timeout = timer(5000);
    const awaiter = this.sampleProccess
      .subscribeTo(requestId)
      .pipe(takeUntil(timeout), shareReplay(1));
    awaiter.subscribe();

    this.commandBus.execute(new SampleCommand(requestId));

    return awaiter;
  }
}
