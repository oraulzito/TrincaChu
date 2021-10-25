import {ID} from "@datorama/akita";
import {Item} from "../item/item.model";
import {EventAttendee} from "../eventAttendee/event-attendees.model";

export interface EventModel {
  id: ID;
  whenWillHappen: Date;
  confirmPresenceUntilDateTime: Date;
  description: string;
  observations: string;
  totalValue: number;
  totalCollected: number;
  totalPerPersonWithAlcoholicDrink: number;
  totalPerPersonWithoutAlcoholicDrink: number;

  attendeeTotal: number;
  attendees: EventAttendee[];
  itens: Item[];
}

export function createEvent(params: Partial<Event>) {
  return {} as Event;
}
