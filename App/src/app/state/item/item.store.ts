import { Injectable } from '@angular/core';
import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import { Item } from './item.model';

export interface ItemState extends EntityState,ActiveState<Item> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'item' })
export class ItemStore extends EntityStore<ItemState> {

  constructor() {
    super();
  }

}
