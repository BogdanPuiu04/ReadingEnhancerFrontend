import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }

  goToWebpage(): void {
    this.router.navigate(['/webpage']);
  }

  goHome(): void{
    this.router.navigate(['/main']);
  }
}
