import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UiService} from "../ui/ui.service";
import {AttendeesStore} from "./attendees.store";
import {catchError, shareReplay, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {Attendees} from "./attendees.model";
import {EventAttendeeStore} from "../eventAttendee/event-attendee.store";
import {EventAttendeeService} from "../eventAttendee/event-attendee.service";

@Injectable({providedIn: 'root'})
export class AttendeesService {

  constructor(
    private attendeesStore: AttendeesStore,
    private eventAttendeeStore: EventAttendeeStore,
    private eventAttendeeService: EventAttendeeService,
    private uiService: UiService,
    private http: HttpClient) {
  }

  get(eventId) {
    return this.http.get<Attendees[]>('/api/attendees/' + eventId, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => this.attendeesStore.set(entities)),
      catchError(error => throwError(error))
    );
  }

  getNonAttendees(eventId) {
    return this.http.get<Attendees[]>('/api/attendees/nonAttendes/' + eventId, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => this.attendeesStore.set(entities)),
      catchError(error => throwError(error))
    );
  }

  add(form) {

    const body = {
      eventId: form.eventId,
      attendeeId: form.attendeeId,
      admin: form.admin,
      paid: form.paid,
      consumeAlcoholicDrink: form.consumeAlcoholicDrink,
    };

    return this.http.post<Attendees>('/api/attendees', body, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => this.eventAttendeeService.get(form.eventId).subscribe()),
      catchError(error => throwError(error))
    );
  }

  pay(attendeeId, eventId) {
    const body = {attendeeId, eventId};
    return this.http.put('/api/attendees/pay', body, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => this.eventAttendeeStore.update(attendeeId, {paid: true})),
      catchError(error => throwError(error))
    );
  }

  remove(attendeeId) {
    return this.http.delete('/api/attendees/' + attendeeId, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => this.eventAttendeeStore.remove(attendeeId)),
      catchError(error => throwError(error))
    );
  }
}
