import {Injectable} from '@angular/core';
import {EntityState, Store, StoreConfig} from '@datorama/akita';
import {User} from './user.model';

export interface UserState extends EntityState<User> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'user'})
export class UserStore extends Store<UserState> {

  constructor() {
    super(
      {
        id: '',
        email: '',
        name: '',
        lastName: '',
      }
    );
  }

}
