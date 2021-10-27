import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from "../../../state/event/event.model";
import {EventAttendeeService} from "../../../state/eventAttendee/event-attendee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserQuery} from "../../../state/user/user.query";
import {UserState} from "../../../state/user/user.store";
import {EventService} from "../../../state/event/event.service";
import {EventStore} from "../../../state/event/event.store";


@Component({
  selector: 'app-barbecue-card',
  templateUrl: './barbecue-card.component.html',
  styleUrls: ['./barbecue-card.component.css']
})
export class BarbecueCardComponent implements OnInit {
  @Input() barbecue: EventModel;
  successPercentage: number;
  eventAttendeeForm: FormGroup;
  isVisibleDetails = false;
  isVisibleEdit = false;
  user: UserState;

  constructor(
    private userQuery: UserQuery,
    private eventService: EventService,
    private eventStore: EventStore,
    private eventAttendeeService: EventAttendeeService,
    private fb: FormBuilder,
  ) {
    this.user = this.userQuery.getValue();
  }


  ngOnInit(): void {
    this.successPercentage = (this.barbecue.totalCollected * 100) / this.barbecue.totalValue
  }

  remove(eventId) {
    this.eventService.remove(eventId).subscribe();
  }

  showDetails(id) {
    this.eventStore.setActive(id);
    this.isVisibleDetails = !this.isVisibleDetails;
  }

  showEdit() {
    this.isVisibleEdit = !this.isVisibleEdit;
  }

  hideDetails() {
    this.isVisibleDetails = !this.isVisibleDetails;
  }

  hideEdit() {
    this.isVisibleEdit = !this.isVisibleEdit;
  }

  participateWithoutAlcoholicDrinks() {
    this.eventAttendeeForm = this.fb.group({
      eventId: [this.barbecue.id, [Validators.required]],
      attendeeId: [this.userQuery.getValue().id, [Validators.required]],
      admin: [false, [Validators.required]],
      paid: [true, [Validators.required]],
      consumeAlcoholicDrink: [false, [Validators.required]],
    });

    this.eventAttendeeService.add(this.eventAttendeeForm.value).subscribe();
  }

  participateWithAlcoholicDrinks() {
    this.eventAttendeeForm = this.fb.group({
      eventId: [this.barbecue.id, [Validators.required]],
      attendeeId: [this.userQuery.getValue().id, [Validators.required]],
      admin: [false, [Validators.required]],
      paid: [true, [Validators.required]],
      consumeAlcoholicDrink: [true, [Validators.required]],
    });

    this.eventAttendeeService.add(this.eventAttendeeForm.value).subscribe();
  }
}
