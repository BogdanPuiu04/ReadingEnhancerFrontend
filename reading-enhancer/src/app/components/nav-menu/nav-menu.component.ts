import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.router.navigate(['/login']);
    localStorage.removeItem("userInfo");
  }
}
