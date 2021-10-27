import {ID} from "@datorama/akita";

export interface Attendees {
  id: ID;
  name: string;
  lastName: string;
  email: string;
  paid: boolean;
  admin: boolean;
  consumeAlcoholicDrink: boolean;
}

export function createAttendees(params: Partial<Attendees>) {
  return {} as Attendees;
}
