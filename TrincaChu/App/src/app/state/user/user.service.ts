import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserStore} from './user.store';
import {SessionStore} from '../session/session.store';
import {Session} from "../session/session.model";
import {tap} from "rxjs/operators";
import {UiService} from "../ui/ui.service";
import {FormControl, ValidationErrors} from "@angular/forms";
import {Observable, Observer} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(
    private http: HttpClient,
    private uiService: UiService,
    private userStore: UserStore,
    private sessionStore: SessionStore,
  ) {
  }

  signup(value: { email: any; password: any; name: any; lastName: any; }) {
    this.userStore.setLoading(true);

    const body = {
      email: value.email,
      password: value.password,
      name: value.name,
      lastName: value.lastName,
    };

    return this.http.post<Session>('/api/user/login', body).pipe(
      tap(token => {
          this.sessionStore.update(token);
          this.userStore.setLoading(false);
        },
        e => {
          this.userStore.setLoading(false);
        })
    );
  }

  get() {
    return this.http.get('/api/user/profile', this.uiService.httpHeaderOptions()).pipe(
      tap(user => {
          this.userStore.update(user);
        }
      ));
  }

  checkEmail = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      return this.getUserByEmail(control.value).subscribe(
        r => {
          if (r) {
            observer.next({error: true});
          } else {
            observer.next(null);
          }
          return r;
        },
        () => observer.error(''),
        () => observer.complete()
      );
    })

  emailFormatCheck = (control: FormControl) => {
    let error = !control.value.match('[A-Za-z0-9_.]+@[A-Za-z0-9]+.[A-Za-z]');
    return {incorret: error};
  };

  checkPassword = (control: FormControl) => {
    let errors = {};

    if (!control.value.match('(?=.*\\d)')) {
      errors['number'] = true;
    }

    if (!control.value.match('(?=.*[a-z])')) {
      errors['lowerCase'] = true;
    }

    if (!control.value.match('(?=.*[A-Z])')) {
      errors['upperCase'] = true;
    }

    if (!control.value.match('(?=.*[^\\w\\d\\s])')) {
      errors['specialDigit'] = true;
    }

    if (!control.value.match('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$')) {
      errors['size'] = true;
    }

    return errors;
  };

  // TODO implement this function in service
  // confirmValidator = (password: string): ValidatorFn => (control: FormControl): { [s: string]: boolean } => {
  //   let error;
  //   console.log(password);
  //   if (control.value === '') {
  //     error = true;
  //     return {required: true};
  //   } else if (control.value !== password) {
  //     error = true;
  //     return {error: true};
  //   }
  //   error = false;
  //   return {};
  // };

  getUserByEmail(value: string) {
    return this.http.get('/api/user/checkEmail?email=' + value);
  }

}
