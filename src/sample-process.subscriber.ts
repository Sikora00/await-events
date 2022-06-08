import { Injectable } from '@nestjs/common';
import { filter, first, map, Observable, Subject } from 'rxjs';

@Injectable()
export class SampleProcessSubscriber {
  private readonly events = new Subject<string>();

  subscribeTo(requestId: string): Observable<void> {
    return this.events.pipe(
      filter((id) => id === requestId),
      first(),
      map(() => undefined),
    );
  }

  finish(requestId: string): void {
    this.events.next(requestId);
  }
}
