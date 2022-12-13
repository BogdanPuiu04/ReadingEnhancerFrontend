import {Component} from '@angular/core';
import {HandlerService} from "./services/handler.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reading-enhancer';

  constructor(private handler: HandlerService) {
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
