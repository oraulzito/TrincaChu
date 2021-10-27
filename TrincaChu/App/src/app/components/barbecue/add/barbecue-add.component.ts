import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EventService} from "../../../state/event/event.service";
import {EventModel} from "../../../state/event/event.model";


@Component({
  selector: 'app-barbecue-add',
  templateUrl: './barbecue-add.component.html',
  styleUrls: ['./barbecue-add.component.css']
})
export class BarbecueAddComponent implements OnInit {
  barbecueForm: FormGroup;

  @Output() saved = new EventEmitter();
  @Input() item?: EventModel;
  @Input() isVisible = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
  ) {
  }

  ngOnInit() {

    this.barbecueForm = this.fb.group({
      whenWillHappen: new FormControl(''),
      confirmPresenceUntilDateTime: new FormControl(''),
      description: new FormControl(''),
      observations: new FormControl(''),
      willYouConsumeAlcoholicDrink: new FormControl(''),
    });
  }

  save() {
    return this.eventService.add(this.barbecueForm.value).subscribe(
      r => {
        this.saved.emit(false);
      }
    );
  }

  cancel() {
    this.saved.emit(true);
  }

}
