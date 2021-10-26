import {ID} from "@datorama/akita";
import {Item} from "../item/item.model";
import {Attendees} from "../attendees/attendees.model";

export interface EventModel {
  id: ID;
  whenWillHappen: Date;
  whereItWillHappen: String;
  confirmPresenceUntilDateTime: Date;
  description: string;
  observations: string;
  totalValue: number;
  totalCollected: number;
  totalPerPersonWithAlcoholicDrink: number;
  totalPerPersonWithoutAlcoholicDrink: number;

  attendeeTotal: number;
  attendees: Attendees[];
  attendeesAdminIds: ID[];
  itens: Item[];
}

export function createEvent(params: Partial<Event>) {
  return {} as Event;
}
