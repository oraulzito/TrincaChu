import {ID} from "@datorama/akita";

export interface EventAttendee {
  id: ID;
  name: string;
  lastName: string;
  email: string;
  paid: boolean;
  admin: boolean;
  consumeAlcoholicDrink: boolean;
}

export function createEventAttendee(params: Partial<EventAttendee>) {
  return {} as EventAttendee;
}
