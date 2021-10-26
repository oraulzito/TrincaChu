import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';

import {UiQuery} from "../../state/ui/ui.query";
import {UiService} from "../../state/ui/ui.service";
import {EventModelService} from "../../state/event/event.service";
import {UserService} from "../../state/user/user.service";
import {AttendeesService} from "../../state/attendees/attendees.service";
import {EventQuery} from "../../state/event/event.query";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  mobile$ = false;
  loadingEvents$: boolean;

  constructor(
    private userService: UserService,
    private eventQuery: EventQuery,
    private eventService: EventModelService,
    private attendeesService: AttendeesService,
    private uiService: UiService,
    private uiQuery: UiQuery,
  ) {


  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.onResize();
    this.uiQuery.select('mobile').subscribe(m => this.mobile$ = m);
    this.eventQuery.selectLoading().subscribe(le=> this.loadingEvents$ = le);
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
