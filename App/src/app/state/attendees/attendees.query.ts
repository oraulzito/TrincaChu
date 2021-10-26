import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AttendeesStore, AttendeesState } from './attendees.store';

@Injectable({ providedIn: 'root' })
export class AttendeesQuery extends QueryEntity<AttendeesState> {

  constructor(protected store: AttendeesStore) {
    super(store);
  }

}
