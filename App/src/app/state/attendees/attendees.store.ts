import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Attendees} from './attendees.model';

export interface AttendeesState extends EntityState<Attendees> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'attendees'})
export class AttendeesStore extends EntityStore<AttendeesState> {

  constructor() {
    super();
  }

}
