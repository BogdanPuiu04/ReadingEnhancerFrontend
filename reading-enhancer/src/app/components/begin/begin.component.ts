import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  takeTest(): void{
    this.router.navigate(['/minigame']);
  }

}
