import {Component, OnInit} from '@angular/core';
import {EventModel} from "../../../state/event/event.model";
import {EventQuery} from "../../../state/event/event.query";

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.css']
})
export class DashboardPanelComponent implements OnInit {
  selectedEvents?: EventModel[];
  loadingEvents$: boolean;

  constructor(
    private eventQuery: EventQuery
  ) {
  }

  ngOnInit(): void {
    this.eventQuery.selectAll().subscribe(e => this.selectedEvents = e);
    this.eventQuery.selectLoading().subscribe(e => this.loadingEvents$ = e);
  }

}
