import {User} from "../user/user.model";

export interface EventAttendee {
  Attendee: User;
  admin: boolean;
  paid: boolean;
  consumeAlcoholicDrink: boolean;
}

export function createEventAttendee(params: Partial<EventAttendee>) {
  return {} as EventAttendee;
}
