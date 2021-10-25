import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {

    // this.releaseForm = this.fb.group({
    //   installment_value: new FormControl(),
    //   value: new FormControl(),
    //   description: new FormControl(),
    //   date_release: new FormControl(),
    //   is_release_paid: new FormControl(),
    //   category_id: new FormControl(),
    //   repeat_times: new FormControl(),
    //   place: new FormControl(),
    //   type: new FormControl(),
    //   card: new FormControl(this.card)
    // });
  }


  // tslint:disable-next-line:typedef
  // editRelease(id) {
  //   this.releaseService.update(id, this.releaseForm.value).subscribe();
  // }
  //
  // // tslint:disable-next-line:typedef
  // deleteRelease(id) {
  //   this.releaseService.remove(id);
  // }
  //
  // // tslint:disable-next-line:typedef
  // saveRelease() {
  //   return this.releaseService.add(this.releaseForm.value, this.card).subscribe(
  //     r => {
  //       this.saved.emit(false);
  //     },
  //     (e) => this.saved.emit(true)
  //   );
  // }
  //
  // // tslint:disable-next-line:typedef
  // cancelRelease() {
  //   this.saved.emit(true);
  // }

}
