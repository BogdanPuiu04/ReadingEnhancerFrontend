import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {ReadingTestService} from "../../services/reading-test.service";
import {ReadingText} from "../../models/readingText";
import {CdTimerComponent} from "angular-cd-timer";
import {Subscription} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {browserRefresh} from "../../app.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-reading-test',
  templateUrl: './reading-test.component.html',
  styleUrls: ['./reading-test.component.scss']
})
export class ReadingTestComponent implements OnInit {
  @Output() text: ReadingText = new ReadingText();
  browserRefresh: boolean = false;

  form!: FormGroup;

  constructor(private readingService: ReadingTestService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  time: number = 0;
  isRead: boolean = false;

  @ViewChild(CdTimerComponent) timer!: CdTimerComponent;


  setTime(): void {
    this.time = this.timer.get().seconds;
    //maybe calculate reading speed on tick?
    console.log(this.time);
  }

  ngOnInit(): void {
    this.getTextBasedQuestion();
    //TODO: reroute to a 'begin' page
    // this.browserRefresh=browserRefresh;
    // // if(this.browserRefresh){
    // //   this.router.navigate(['/main']);
    // }
  }

  getTextBasedQuestion(): void {
    this.readingService.getText().subscribe((data) => {
      this.text = data;
    })
  }

  stopTimer(): void {
    this.timer.stop();
    this.isRead = true;
  }
}
