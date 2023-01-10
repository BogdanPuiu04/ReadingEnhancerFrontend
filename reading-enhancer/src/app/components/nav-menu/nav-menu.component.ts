import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HandlerService} from "../../services/handler.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  name: string = '';
  isAdmin!: boolean;

  constructor(private userService: UserService,
              private handlerService: HandlerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.name = this.handlerService.getUserFromStorage().name;
    this.isAdmin = this.handlerService.getUserFromStorage().isAdmin;
  }

  logout(): void {
    this.userService.logout();
  }

  goToWebpage(): void {
    this.router.navigate(['/webpage']);
  }

  goHome(): void {
    this.router.navigate(['/main']);
  }

  goToTest(): void {
    this.router.navigate(['/begin']);
  }

  goToChangeTest(): void{
    this.router.navigate(['/change-test']);
  }
}
