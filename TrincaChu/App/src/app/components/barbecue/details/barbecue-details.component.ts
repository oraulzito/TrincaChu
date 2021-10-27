import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventService} from "../../../state/event/event.service";
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
import {EventAttendeeService} from "../../../state/eventAttendee/event-attendee.service";

@Component({
  selector: 'app-barbecue-details',
  templateUrl: './barbecue-details.component.html',
  styleUrls: ['./barbecue-details.component.css']
})
export class BarbecueDetailsComponent implements OnInit {
  @Output() savedDetails = new EventEmitter();
  @Input() id;
  @Input() isVisible = false;

  barbecueDetails: EventModel;
  attendees: Attendees[];
  items: Item[];
  user: UserState;

  constructor(
    private eventQuery: EventQuery,
    private eventService: EventService,
    private attendeeQuery: AttendeesQuery,
    private attendeesService: AttendeesService,
    private eventAttendeesService: EventAttendeeService,
    private userQuery: UserQuery,
    private userService: UserService,
    private itemQuery: ItemQuery,
    private itemService: ItemService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.userQuery.getValue();
    this.itemQuery.selectAll().subscribe(i => this.items = i);

    this.itemService.getEventItens(this.id).subscribe();
    this.eventService.get(this.id).subscribe(e => this.barbecueDetails = e);
    this.eventAttendeesService.get(this.id).subscribe(r => this.barbecueDetails.attendees = r);
  }

  cancel() {
    this.savedDetails.emit(false);
  }
}
