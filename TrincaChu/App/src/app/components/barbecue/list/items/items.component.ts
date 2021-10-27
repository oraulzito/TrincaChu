import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../state/item/item.model";
import {ItemQuery} from "../../../../state/item/item.query";
import {ItemService} from "../../../../state/item/item.service";
import {EventModel} from "../../../../state/event/event.model";
import {UserQuery} from "../../../../state/user/user.query";
import {UserState} from "../../../../state/user/user.store";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() barbecue: EventModel;
  items: Item[];
  user: UserState;

  constructor(
    private userQuery: UserQuery,
    private itemQuery: ItemQuery,
    private itemService: ItemService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.userQuery.getValue();
    this.itemService.getEventItens(this.barbecue.id).subscribe();
    this.itemQuery.selectAll().subscribe(i => this.items = i);
  }


  removeItem(id) {
    this.itemService.remove(id).subscribe();
  }

}
