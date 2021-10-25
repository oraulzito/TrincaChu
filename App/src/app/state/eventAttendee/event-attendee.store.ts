import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { EventAttendee } from './event-attendees.model';

export interface EventAttendeeState extends EntityState<EventAttendee> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'eventAttendee' })
export class EventAttendeeStore extends EntityStore<EventAttendeeState> {

  constructor() {
    super();
  }

}
