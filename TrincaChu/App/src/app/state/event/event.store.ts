import {Injectable} from '@angular/core';
import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {EventModel} from './event.model';

export interface EventState extends EntityState, ActiveState<EventModel> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'event'})
export class EventStore extends EntityStore<EventState> {

  constructor() {
    super();
  }

}
