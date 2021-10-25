import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventQuery} from "../../../state/event/event.query";
import {EventModel} from "../../../state/event/event.model";

@Component({
  selector: 'app-dashboard-desktop',
  templateUrl: './dashboard-desktop.component.html',
  styleUrls: ['./dashboard-desktop.component.css']
})
export class DashboardDesktopComponent implements OnInit, OnDestroy {
  selectedEvents?: EventModel[];

  constructor(
    private eventQuery: EventQuery
  ) {
  }

  ngOnInit(): void {
    this.eventQuery.selectAll().subscribe(e => this.selectedEvents = e);
  }

  ngOnDestroy() {
  }
}
