import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../../state/session/session.service';
import {UserQuery} from "../../../state/user/user.query";
import {EventService} from "../../../state/event/event.service";
import {UiQuery} from "../../../state/ui/ui.query";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user = this.userQuery.getValue();
  isVisible = false;
  mobile$ = false;
  isCollapsed = true;

  constructor(
    private sessionService: SessionService,
    private eventService: EventService,
    private userQuery: UserQuery,
    private uiQuery: UiQuery
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.uiQuery.select('mobile').subscribe(m => this.mobile$ = m);
  }

  addBarbecue() {
    this.isVisible = !this.isVisible;
  }

  getFutureEvents() {
    this.eventService.getFutureEvents().subscribe();
  }

  getEventsIWillAttend() {
    this.eventService.getEventsIWillAttend().subscribe();
  }

  getMyEvents() {
    this.eventService.getMyEvents().subscribe();
  }


  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.sessionService.logout();
  }

  ngOnDestroy(): void {

  }
}

