import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {shareReplay, tap} from 'rxjs/operators';
import {SessionStore} from './session.store';
import {resetStores} from '@datorama/akita';
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class SessionService {

  constructor(
    private sessionStore: SessionStore,
    private router: Router,
    private http: HttpClient
  ) {
  }


  // tslint:disable-next-line:typedef
  login(body: any) {
    this.sessionStore.setLoading(true);
    return this.http.post(`/api/user/login`, {
      "email": body.email,
      "password": body.password
    }).pipe(
      tap(
        token => {
          this.sessionStore.update(token);
        },
        error => {
          this.sessionStore.setError(error);
          this.sessionStore.setLoading(false);
        },
        () => {
          this.sessionStore.setLoading(false);
        }),
      shareReplay(1));
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.sessionStore.setLoading(true);
    this.sessionStore.update({token: ''});
    this.sessionStore.setLoading(false);
    localStorage.clear();
    resetStores();
    this.router.navigate(['/']);
  }
}
