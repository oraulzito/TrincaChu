import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {Observable} from 'rxjs';
import {SessionQuery} from "../state/session/session.query";
import {UiQuery} from "../state/ui/ui.query";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {
  private isLooged = false;

  constructor(
    private router: Router,
    private sessionQuery: SessionQuery,
    private uiQuery: UiQuery
  ) {
    this.sessionQuery.isLoggedIn$.subscribe((e) => {
      this.isLooged = e;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLooged) {
      if (this.uiQuery.getValue().url === '/') {
        this.router.navigate(['events']).then();
      }
      return true;
    } else {
      if (this.uiQuery.getValue().url.includes('/events')) {
        this.router.navigate(['/login']).then();
        return false;
      }
      return true;
    }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.uiQuery.getValue().url === '/') {
      return !this.isLooged;
    } else {
      return this.isLooged;
    }
  }
}
