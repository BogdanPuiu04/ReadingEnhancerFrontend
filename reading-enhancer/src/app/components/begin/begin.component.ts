import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReadingTestService} from "../../services/reading-test.service";
import {UserHighScore} from "../../models/allUserHighscores";

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss']
})
export class BeginComponent implements OnInit {

  users: UserHighScore[] = [];
  count!: number;
  displayedColumns: string[] = ['placement', 'readingSpeed', 'username', 'highScore']

  constructor(private router: Router,
              private readingService: ReadingTestService) {
  }

  ngOnInit(): void {
    this.readingService.getTopHighScores().subscribe((data) => {
      this.users = data.users;
      this.count = this.users.length;
    });
  }

  takeTest(): void {
    this.router.navigate(['/minigame']);
  }


}

