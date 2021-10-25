import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../../state/session/session.service';
import {UserQuery} from "../../../state/user/user.query";
import {EventModelService} from "../../../state/event/event.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user = this.userQuery.getValue();
  isVisible = false;

  constructor(
    private sessionService: SessionService,
    private eventService: EventModelService,
    private userQuery: UserQuery
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {

  }

  addBarbecue() {
    this.isVisible = !this.isVisible;
  }

  getAll() {
    this.eventService.getAll().subscribe();
  }

  getEventsIWillAttend() {
    this.eventService.getEventsIWillAttend().subscribe();
  }

  getMyEvents() {
    this.eventService.getMyEvents().subscribe();
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.sessionService.logout();
  }

  handleCancel(){
  }

  handleOk(){}

  ngOnDestroy(): void {

  }
}

