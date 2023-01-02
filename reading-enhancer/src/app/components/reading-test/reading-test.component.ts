import {Component, OnInit} from '@angular/core';
import {ReadingTestService} from "../../services/reading-test.service";
import {ReadingText} from "../../models/readingText";

@Component({
  selector: 'app-reading-test',
  templateUrl: './reading-test.component.html',
  styleUrls: ['./reading-test.component.scss']
})
export class ReadingTestComponent implements OnInit {
  text: ReadingText = new ReadingText();

  constructor(private readingService: ReadingTestService) {
  }

  ngOnInit(): void {
    this.getTextBasedQuestion();
  }

  getTextBasedQuestion(): void {
    this.readingService.getText().subscribe((data) => {
      console.log(data);
      this.text = data;
    })
  }
}
