import {ID} from "@datorama/akita";

export interface Item {
  id: ID;
  name: string;
  value: number;
  quantity: number;
  eventId: ID;
  category: Category;
}

enum Category {
  Drink,
  AlcoholicDrink,
  Food
}

export function createItem(params: Partial<Item>) {
  return {} as Item;
}
