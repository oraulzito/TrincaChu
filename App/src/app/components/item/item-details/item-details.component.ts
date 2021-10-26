import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventModelService} from "../../../state/event/event.service";
import {EventQuery} from "../../../state/event/event.query";
import {EventModel} from "../../../state/event/event.model";
import {Item} from "../../../state/item/item.model";
import {AttendeesQuery} from "../../../state/attendees/attendees.query";
import {AttendeesService} from "../../../state/attendees/attendees.service";
import {ItemQuery} from "../../../state/item/item.query";
import {ItemService} from "../../../state/item/item.service";
import {Attendees} from "../../../state/attendees/attendees.model";
import {UserQuery} from "../../../state/user/user.query";
import {UserState} from "../../../state/user/user.store";
import {UserService} from "../../../state/user/user.service";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @Output() savedDetails = new EventEmitter();
  @Input() id;
  @Input() isVisible = false;

  detailEvent: EventModel;
  attendees: Attendees[];
  itens: Item[];
  user: UserState;

  constructor(
    private eventQuery: EventQuery,
    private eventService: EventModelService,
    private attendeeQuery: AttendeesQuery,
    private attendeesService: AttendeesService,
    private userQuery: UserQuery,
    private userService: UserService,
    private itemQuery: ItemQuery,
    private itemService: ItemService,
  ) {
  }

  ngOnInit(): void {
    this.eventService.get(this.id).subscribe(e => this.detailEvent = e);

    this.attendeesService.get(this.id).subscribe();
    this.itemService.getEventItens(this.id).subscribe();

    this.itemQuery.selectAll().subscribe(i => this.itens = i);
    this.attendeeQuery.selectAll().subscribe(a => this.attendees = a);
    this.user = this.userQuery.getValue();
  }

  confirmPay(attendeeId, eventId) {
    this.attendeesService.pay(attendeeId, eventId).subscribe();
  }

  removeAttendee(attendeeId) {
    this.attendeesService.remove(attendeeId).subscribe();
  }

  removeItem(id) {

  }

  cancel() {
    this.savedDetails.emit(false);
  }
}
