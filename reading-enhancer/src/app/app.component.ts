import {Component} from '@angular/core';
import {HandlerService} from "./services/handler.service";
import {NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reading-enhancer';
  subscription!: Subscription;

  constructor(private handler: HandlerService,
              private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  isLogin(): boolean {
    if (localStorage.getItem('userInfo') != null) {
      if (this.handler.getTokenFromLocalStorage()) {
        return true;
      }
    }
    return false;
  }
}
