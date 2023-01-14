import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {ReadingTestService} from "../../services/reading-test.service";
import {ReadingText} from "../../models/readingText";
import {CdTimerComponent} from "angular-cd-timer";
import {Router} from "@angular/router";
import {browserRefresh} from "../../app.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-reading-test',
  templateUrl: './reading-test.component.html',
  styleUrls: ['./reading-test.component.scss']
})
export class ReadingTestComponent implements OnInit {
  @Output() text: ReadingText = new ReadingText();
  browserRefresh: boolean = false;
  words: number = 0;
  @Output() wpm: number = 200;

  form!: FormGroup;

  constructor(private readingService: ReadingTestService,
              private router: Router) {
  }

  time: number = 0;
  delay: number = 0;
  isRead: boolean = false;

  @ViewChild(CdTimerComponent) timer!: CdTimerComponent;


  setTime(): void {
    this.time = this.timer.get().seconds;
  }

  ngOnInit(): void {
    this.getTextBasedQuestion();
    this.browserRefresh = browserRefresh;
    if (this.browserRefresh) {
      this.router.navigate(['/begin']);
    }
  }

  getTextBasedQuestion(): void {
    this.readingService.getText().subscribe((data) => {
      this.text = data.text;
      this.words = data.wordCount;
    })
  }

  stopTimer(): void {
    if (this.delay > 10) {
      this.timer.stop();
      this.isRead = true;
    }
  }

  calculateWordsPerMinute(): void {
    this.delay = this.timer.get().minutes * 60 + this.timer.get().seconds;
    this.wpm = Math.floor(this.words / (this.timer.get().minutes * 60 + this.timer.get().seconds) * 60);
  }
}
