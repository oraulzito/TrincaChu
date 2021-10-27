import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../state/item/item.model";
import {ItemQuery} from "../../../../state/item/item.query";
import {ItemService} from "../../../../state/item/item.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() totalValueBarbecue: number;
  items: Item[];

  constructor(
    private itemQuery: ItemQuery,
    private itemService: ItemService,
  ) {
  }

  ngOnInit(): void {
    this.itemQuery.selectAll().subscribe(i => this.items = i);
  }


  removeItem(id) {
    this.itemService.remove(id).subscribe();
  }

}
