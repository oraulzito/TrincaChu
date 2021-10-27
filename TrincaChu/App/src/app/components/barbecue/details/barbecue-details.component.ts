import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventService} from "../../../state/event/event.service";
import {EventQuery} from "../../../state/event/event.query";
import {EventModel} from "../../../state/event/event.model";
import {Item} from "../../../state/item/item.model";
import {AttendeesQuery} from "../../../state/attendees/attendees.query";
import {AttendeesService} from "../../../state/attendees/attendees.service";
import {Attendees} from "../../../state/attendees/attendees.model";
import {UserQuery} from "../../../state/user/user.query";
import {UserState} from "../../../state/user/user.store";
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
  ) {
  }

  ngOnInit(): void {
    this.user = this.userQuery.getValue();

    this.eventQuery.selectActive().subscribe(e => this.barbecueDetails = e);
  }

  cancel() {
    this.savedDetails.emit(false);
  }
}
