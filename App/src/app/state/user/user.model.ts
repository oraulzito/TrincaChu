import {ID} from "@datorama/akita";

export interface User {
  id: ID;
  name: string;
  lastName: string;
  email: string;
  total?: number;
}

export function createUser(params: Partial<User>) {
  return {} as User;
}
