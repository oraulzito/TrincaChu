import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UiService} from "../ui/ui.service";
import {AttendeesStore} from "./attendees.store";
import {catchError, shareReplay, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {Attendees} from "./attendees.model";
import {EventAttendee} from "../eventAttendee/event-attendees.model";
import {EventAttendeeStore} from "../eventAttendee/event-attendee.store";

@Injectable({providedIn: 'root'})
export class AttendeesService {

  constructor(
    private attendeesStore: AttendeesStore,
    private eventAttendeeStore: EventAttendeeStore,
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

    return this.http.post<EventAttendee>('/api/attendees', body, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      catchError(error => throwError(error))
    );
  }

  pay(attendeeId, eventId) {
    const body = {attendeeId, eventId};
    return this.http.put('/api/attendees/pay', body, this.uiService.httpHeaderOptions());
  }

  remove(attendeeId){
    return this.http.delete('/api/attendees/'+attendeeId, this.uiService.httpHeaderOptions());
  }
}
