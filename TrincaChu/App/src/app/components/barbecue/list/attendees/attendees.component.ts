import {Component, Input, OnInit} from '@angular/core';
import {Attendees} from "../../../../state/attendees/attendees.model";
import {UserQuery} from "../../../../state/user/user.query";
import {UserState} from "../../../../state/user/user.store";
import {ID} from "@datorama/akita";
import {EventAttendeeService} from "../../../../state/eventAttendee/event-attendee.service";
import {EventAttendeeQuery} from "../../../../state/eventAttendee/event-attendee.query";
import {AttendeesService} from "../../../../state/attendees/attendees.service";
import {EventModel} from "../../../../state/event/event.model";

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.css']
})
export class AttendeesComponent implements OnInit {
  @Input() barbecue: EventModel;

  attendees: Attendees[];
  user: UserState;

  constructor(
    private attendeeService: AttendeesService,
    private eventAttendeeService: EventAttendeeService,
    private eventAttendeeQuery: EventAttendeeQuery,
    private userQuery: UserQuery,
  ) {
  }

  ngOnInit(): void {
    this.user = this.userQuery.getValue();
    this.eventAttendeeService.get(this.barbecue.id).subscribe();
    this.eventAttendeeQuery.selectAll().subscribe(a => this.attendees = a);
  }


  confirmPay(attendeeId, eventId) {
    this.attendeeService.pay(attendeeId, eventId).subscribe();
  }

  removeAttendee(attendeeId) {
    this.attendeeService.remove(attendeeId).subscribe();
  }
}
