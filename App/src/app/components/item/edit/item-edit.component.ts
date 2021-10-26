import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EventModel} from "../../../state/event/event.model";
import {EventModelService} from "../../../state/event/event.service";
import {ItemService} from "../../../state/item/item.service";
import {AttendeesQuery} from "../../../state/attendees/attendees.query";
import {Attendees} from "../../../state/attendees/attendees.model";
import {AttendeesService} from "../../../state/attendees/attendees.service";
import {ItemQuery} from "../../../state/item/item.query";
import {Item} from "../../../state/item/item.model";
import {UserQuery} from "../../../state/user/user.query";
import {UserState} from "../../../state/user/user.store";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  itemEditForm: FormGroup;
  itemAddForm: FormGroup;
  attendeeAddForm: FormGroup;
  attendees: Attendees[];
  itens: Item[];

  @Output() savedEdit = new EventEmitter();
  @Input() item: EventModel;
  @Input() isVisible = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventModelService,
    private attendeeQuery: AttendeesQuery,
    private attendeesService: AttendeesService,
    private itemQuery: ItemQuery,
    private itemService: ItemService,
    private userQuery: UserQuery,
  ) {
  }

  ngOnInit() {
    this.attendeesService.getNonAttendees(this.item.id).subscribe();
    this.itemService.getEventItens(this.item.id).subscribe();

    this.itemQuery.selectAll().subscribe(i => this.itens = i);
    this.attendeeQuery.selectAll().subscribe(a => this.attendees = a);

    this.itemEditForm = this.fb.group({
      whenWillHappen: new FormControl(this.item.whenWillHappen),
      whereItWillHappen: new FormControl(this.item.whereItWillHappen),
      confirmPresenceUntilDateTime: new FormControl(this.item.confirmPresenceUntilDateTime),
      description: new FormControl(this.item.description),
      observations: new FormControl(this.item.observations),
    });

    this.itemAddForm = this.fb.group({
      name: new FormControl(''),
      value: new FormControl(0),
      quantity: new FormControl(0),
      eventId: new FormControl(this.item.id),
      category: new FormControl(''),
    });

    this.attendeeAddForm = this.fb.group({
      eventId: new FormControl(this.item.id),
      attendeeId: new FormControl(),
      admin: new FormControl(false),
      consumeAlcoholicDrink: new FormControl(),
      paid: new FormControl(),
    });
  }

  addItem() {
    this.itemService.add(this.itemAddForm.value).subscribe();
  }

  addAttendee() {
    this.attendeesService.add(this.attendeeAddForm.value).subscribe();
  }

  edit(id) {
    this.eventService.update(id, this.itemEditForm.value).subscribe();
  }

  delete(id) {
    this.eventService.remove(id);
  }

  cancel() {
    this.savedEdit.emit(true);
  }
}
