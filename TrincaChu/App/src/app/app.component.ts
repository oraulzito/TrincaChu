import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiStore} from "./state/ui/ui.store";
import {NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'App';
  event$: Subscription;

  constructor(
    private router: Router,
    private uiStore: UiStore,
  ) {
    this.event$
      = this.router.events
      .subscribe(
        (event) => {
          // console.log(event);
          if (event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationError) {
            this.uiStore.update({url: event.url});
          }
        });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.event$.unsubscribe();
  }
}
