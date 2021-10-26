import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ID, setLoading} from '@datorama/akita';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {throwError} from "rxjs";
import {EventModel} from "./event.model";
import {EventStore} from "./event.store";
import {UiService} from "../ui/ui.service";

@Injectable({providedIn: 'root'})
export class EventModelService {

  constructor(
    private eventStore: EventStore,
    private uiService: UiService,
    private http: HttpClient
  ) {
  }

  // tslint:disable-next-line:typedef
  getAll() {
    return this.http.get<EventModel[]>('/api/event', this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      setLoading(this.eventStore),
      tap(entity => this.eventStore.set(entity)),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  get(id: number) {
    return this.http.get<EventModel>('/api/event/' + id, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      setLoading(this.eventStore),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  getFutureEvents() {
    return this.http.get<EventModel[]>('/api/event/futureEvents', this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      setLoading(this.eventStore),
      tap(entity => this.eventStore.set(entity)),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  getPastEvents() {
    return this.http.get<EventModel[]>('/api/event/pastEvents', this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      setLoading(this.eventStore),
      tap(entity => this.eventStore.set(entity)),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  getMyEvents() {
    return this.http.get<EventModel[]>('/api/event/myEvents', this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      setLoading(this.eventStore),
      tap(entity => this.eventStore.set(entity)),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  getEventsIWillAttend() {
    return this.http.get<EventModel[]>('/api/event/eventsIWillAttend', this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      setLoading(this.eventStore),
      tap(entity => this.eventStore.set(entity)),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  add(form: any) {

    const body = {
      whenWillHappen: form.whenWillHappen,
      confirmPresenceUntilDateTime: form.confirmPresenceUntilDateTime,
      description: form.description,
      observations: form.observations,
      willYouConsumeAlcoholicDrink: form.willYouConsumeAlcoholicDrink,
    };

    return this.http.post('/api/event', body, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => this.eventStore.add(entities)),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  update(id: number, form: any) {

    const body = {
      id: form.id,
      whenWillHappen: form.whenWillHappen,
      confirmPresenceUntilDateTime: form.confirmPresenceUntilDateTime,
      description: form.description,
      observations: form.observations,
      totalValue: 0,
      totalCollected: form.totalCollected,
      totalPerPersonWithAlcoholicDrink: 0,
      totalPerPersonWithoutAlcoholicDrink: 0,
    };

    return this.http.put('/api/event/' + id, body, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => entities === 1 ? this.eventStore.update(id, body) : this.eventStore.setError("Not updated")),
      catchError(error => throwError(error))
    );
  }

  // tslint:disable-next-line:typedef
  remove(id: ID) {
    return this.http.delete<number>('/api/event/' + id, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => entities === 1 ? this.eventStore.remove(id) : this.eventStore.setError("Not removed")),
      catchError(error => throwError(error))
    );
  }

}
