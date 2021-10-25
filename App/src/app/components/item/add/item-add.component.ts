import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EventModelService} from "../../../state/event/event.service";
import {EventModel} from "../../../state/event/event.model";


@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  itemForm: FormGroup;

  @Output() saved = new EventEmitter();
  @Input() item?: EventModel;
  @Input() isVisible = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventModelService,
  ) {
  }

  ngOnInit() {

    this.itemForm = this.fb.group({
      whenWillHappen: new FormControl(''),
      confirmPresenceUntilDateTime: new FormControl(''),
      description: new FormControl(''),
      observations: new FormControl(''),
      willYouConsumeAlcoholicDrink: new FormControl(''),
    });
  }

  save() {
    return this.eventService.add(this.itemForm.value).subscribe(
      r => {
        this.saved.emit(false);
      }
    );
  }

  cancel() {
    this.saved.emit(true);
  }

}
