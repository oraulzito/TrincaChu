import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from "../../../state/event/event.model";
import {EventAttendeeService} from "../../../state/eventAttendee/event-attendee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserQuery} from "../../../state/user/user.query";


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

  constructor(
    private userQuery: UserQuery,
    private eventAttendeeService: EventAttendeeService,
    private fb: FormBuilder,
  ) {
  }


  ngOnInit(): void {
    this.successPercentage = (this.eventModel.totalCollected * 100) / this.eventModel.totalValue


  }

  show() {
    this.isVisibleDetails = !this.isVisibleDetails;
  }

  edit() {
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
