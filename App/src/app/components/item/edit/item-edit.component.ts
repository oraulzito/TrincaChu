import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EventModel} from "../../../state/event/event.model";
import {EventModelService} from "../../../state/event/event.service";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  itemEditForm: FormGroup;
  itemAddForm: FormGroup;
  attendeeAddForm: FormGroup;

  @Output() saved = new EventEmitter();
  @Input() item: EventModel;
  @Input() isVisible = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventModelService,
  ) {
  }

  ngOnInit() {
    this.itemEditForm = this.fb.group({
      whenWillHappen: new FormControl(this.item.whenWillHappen),
      confirmPresenceUntilDateTime: new FormControl(this.item.confirmPresenceUntilDateTime),
      description: new FormControl(this.item.description),
      observations: new FormControl(this.item.observations),
    });

    this.itemAddForm = this.fb.group({
      name: new FormControl(0),
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

  edit(id) {
    this.eventService.update(id, this.itemEditForm.value).subscribe();
  }

  delete(id) {
    this.eventService.remove(id);
  }

  cancel() {
    this.saved.emit(true);
  }
}
