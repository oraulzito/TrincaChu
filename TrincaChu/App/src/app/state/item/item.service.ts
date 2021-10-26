import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ID, setLoading} from '@datorama/akita';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {ItemStore} from './item.store';
import {throwError} from "rxjs";
import {UiService} from "../ui/ui.service";
import {Item} from "./item.model";

@Injectable({providedIn: 'root'})
export class ItemService {

  constructor(
    private itemStore: ItemStore,
    private uiService: UiService,
    private http: HttpClient
  ) {
  }

  get() {
    return this.http.get<Item[]>('/api/item', this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      setLoading(this.itemStore),
      tap(entity => this.itemStore.set(entity)),
      catchError(error => throwError(error))
    );
  }

  getEventItens(eventId) {
    return this.http.get<Item[]>('/api/item/event/' + eventId, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      setLoading(this.itemStore),
      tap(entity => this.itemStore.set(entity)),
      catchError(error => throwError(error))
    );
  }

  add(form: any) {
    const body = {
      name: form.name,
      value: form.value,
      quantity: form.quantity,
      eventId: form.eventId,
      category: form.category,
    };

    return this.http.post('/api/item', body, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => this.itemStore.add(entities)),
      catchError(error => throwError(error))
    );
  }

  update(id: number, form: any) {
    const body = {
      id: form.id,
      name: form.name,
      value: form.value,
      quantity: form.quantity,
      eventId: form.eventId,
      category: form.category,
    };

    return this.http.put('/api/item/' + id, body, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => entities === 1 ? this.itemStore.update(id, body) : this.itemStore.setError("Not updated")),
      catchError(error => throwError(error))
    );
  }

  remove(id: ID) {
    return this.http.delete<number>('/api/item/' + id, this.uiService.httpHeaderOptions()).pipe(
      shareReplay(1),
      tap(entities => entities === 1 ? this.itemStore.remove(id) : this.itemStore.setError("Not removed")),
      catchError(error => throwError(error))
    );
  }

}
