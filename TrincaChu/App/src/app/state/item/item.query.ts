import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ItemStore, ItemState } from './item.store';

@Injectable({ providedIn: 'root' })
export class ItemQuery extends QueryEntity<ItemState> {

  constructor(protected store: ItemStore) {
    super(store);
  }

}
