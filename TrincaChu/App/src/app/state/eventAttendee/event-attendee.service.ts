import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {EventAttendeeStore} from './event-attendee.store';

import {throwError} from "rxjs";
import {UiService} from "../ui/ui.service";
import {EventAttendee} from "./event-attendees.model";

@Injectable({providedIn: 'root'})
export class EventAttendeeService {

  constructor(
    private eventAttendeeStore: EventAttendeeStore,
    private uiService: UiService,
    private http: HttpClient) {
  }

  get(eventId) {
    return this.http.get<EventAttendee[]>('/api/attendees/' + eventId, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => this.eventAttendeeStore.set(entities)),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  add(form: any) {

    const body = {
      eventId: form.eventId,
      attendeeId: form.attendeeId,
      admin: form.admin,
      paid: form.paid,
      consumeAlcoholicDrink: form.consumeAlcoholicDrink,
    };

    return this.http.post<EventAttendee>('/api/attendees', body, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => this.eventAttendeeStore.add(entities)),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  update(id: number, form: any) {

    const body = {
      eventId: form.eventId,
      attendeeId: form.attendeeId,
      admin: form.admin,
      paid: form.paid,
      consumeAlcoholicDrink: form.consumeAlcoholicDrink,
    };

    return this.http.put('/api/attendees/' + id, body, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => entities === 1 ? this.eventAttendeeStore.update(id, body) : this.eventAttendeeStore.setError("Not updated")),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  remove(id: ID) {
    return this.http.delete<number>('/api/attendees/' + id, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => {
        this.eventAttendeeStore.remove(id);
      }),
      catchError(error => throwError(error))
    );
  }

}
