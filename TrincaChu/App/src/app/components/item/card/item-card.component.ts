import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from "../../../state/event/event.model";
import {EventAttendeeService} from "../../../state/eventAttendee/event-attendee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserQuery} from "../../../state/user/user.query";
import {UserState} from "../../../state/user/user.store";
import {User} from "../../../state/user/user.model";
import {EventService} from "../../../state/event/event.service";


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() eventModel: EventModel;
  successPercentage: number;
  eventAttendeeForm: FormGroup;
  isVisibleDetails = false;
  isVisibleEdit = false;
  user: UserState;

  constructor(
    private userQuery: UserQuery,
    private eventService: EventService,
    private eventAttendeeService: EventAttendeeService,
    private fb: FormBuilder,
  ) {
    this.user = this.userQuery.getValue();
  }


  ngOnInit(): void {
    this.successPercentage = (this.eventModel.totalCollected * 100) / this.eventModel.totalValue
  }

  remove(eventId) {
    this.eventService.remove(eventId).subscribe();
  }

  showDetails() {
    this.isVisibleDetails = !this.isVisibleDetails;
  }

  showEdit() {
    this.isVisibleEdit = !this.isVisibleEdit;
  }

  participateWithoutAlcoholicDrinks() {
    this.eventAttendeeForm = this.fb.group({
      eventId: [this.eventModel.id, [Validators.required]],
      attendeeId: [this.userQuery.getValue().id, [Validators.required]],
      admin: [false, [Validators.required]],
      paid: [true, [Validators.required]],
      consumeAlcoholicDrink: [false, [Validators.required]],
    });

    this.eventAttendeeService.add(this.eventAttendeeForm.value).subscribe();
  }

  participateWithAlcoholicDrinks() {
    this.eventAttendeeForm = this.fb.group({
      eventId: [this.eventModel.id, [Validators.required]],
      attendeeId: [this.userQuery.getValue().id, [Validators.required]],
      admin: [false, [Validators.required]],
      paid: [true, [Validators.required]],
      consumeAlcoholicDrink: [true, [Validators.required]],
    });

    this.eventAttendeeService.add(this.eventAttendeeForm.value).subscribe();
  }
}
