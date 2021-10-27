import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EventModel} from "../../../state/event/event.model";
import {EventService} from "../../../state/event/event.service";
import {ItemService} from "../../../state/item/item.service";
import {AttendeesQuery} from "../../../state/attendees/attendees.query";
import {Attendees} from "../../../state/attendees/attendees.model";
import {AttendeesService} from "../../../state/attendees/attendees.service";
import {ItemQuery} from "../../../state/item/item.query";
import {Item} from "../../../state/item/item.model";
import {UserQuery} from "../../../state/user/user.query";
import {EventAttendeeService} from "../../../state/eventAttendee/event-attendee.service";
import {EventAttendeeQuery} from "../../../state/eventAttendee/event-attendee.query";

@Component({
  selector: 'app-barbecue-edit',
  templateUrl: './barbecue-edit.component.html',
  styleUrls: ['./barbecue-edit.component.css']
})
export class BarbecueEditComponent implements OnInit {
  barbecueEditForm: FormGroup;
  itemAddForm: FormGroup;
  attendeeAddForm: FormGroup;

  attendees: Attendees[];

  itens: Item[];

  @Output() savedEdit = new EventEmitter();
  @Input() barbecueEdit: EventModel;
  @Input() isVisible = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private attendeeQuery: AttendeesQuery,
    private attendeesService: AttendeesService,
    private eventAttendeeService: EventAttendeeService,
    private eventAttendeeQuery: EventAttendeeQuery,
    private itemQuery: ItemQuery,
    private itemService: ItemService,
  ) {
  }

  ngOnInit() {
    this.itemService.getEventItens(this.barbecueEdit.id).subscribe();
    this.attendeesService.getNonAttendees(this.barbecueEdit.id).subscribe();

    this.barbecueEditForm = this.fb.group({
      whenWillHappen: new FormControl(this.barbecueEdit.whenWillHappen),
      whereItWillHappen: new FormControl(this.barbecueEdit.whereItWillHappen),
      confirmPresenceUntilDateTime: new FormControl(this.barbecueEdit.confirmPresenceUntilDateTime),
      description: new FormControl(this.barbecueEdit.description),
      observations: new FormControl(this.barbecueEdit.observations),
    });

    this.itemAddForm = this.fb.group({
      name: new FormControl(''),
      value: new FormControl(0),
      quantity: new FormControl(0),
      eventId: new FormControl(this.barbecueEdit.id),
      category: new FormControl(0),
    });

    this.attendeeAddForm = this.fb.group({
      eventId: new FormControl(this.barbecueEdit.id),
      attendeeId: new FormControl(),
      admin: new FormControl(false),
      consumeAlcoholicDrink: new FormControl(),
      paid: new FormControl(),
    });
  }

  addItem() {
    this.itemService.add(this.itemAddForm.value).subscribe(
      () => this.itemAddForm.clearValidators()
    );
  }

  addAttendee() {
    this.attendeesService.add(this.attendeeAddForm.value).subscribe(
      () => this.attendeeAddForm.clearValidators()
    );
  }

  edit(id) {
    this.eventService.update(id, this.barbecueEditForm.value).subscribe();
  }

  delete(id) {
    this.eventService.remove(id);
  }

  cancel() {
    this.savedEdit.emit(true);
  }
}
