import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';

import {UiQuery} from "../../state/ui/ui.query";
import {UiService} from "../../state/ui/ui.service";
import {EventModelService} from "../../state/event/event.service";
import {UserService} from "../../state/user/user.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  mobile$ = false;

  constructor(
    private userService: UserService,
    private eventService: EventModelService,
    private uiService: UiService,
    private uiQuery: UiQuery,
  ) {


  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.onResize();
    this.uiQuery.select('mobile').subscribe(m => this.mobile$ = m);
    this.eventService.getFutureEvents().subscribe();
    this.userService.get().subscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.uiService.mobile();
  }

  ngOnDestroy(): void {
  }

}
