import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { EventAttendeeStore, EventAttendeeState } from './event-attendee.store';

@Injectable({ providedIn: 'root' })
export class EventAttendeeQuery extends QueryEntity<EventAttendeeState> {

  constructor(protected store: EventAttendeeStore) {
    super(store);
  }

}
