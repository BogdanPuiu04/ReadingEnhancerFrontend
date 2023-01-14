import {Component, OnInit} from '@angular/core';
import {HandlerService} from "../../services/handler.service";
import {ReadingTestService} from "../../services/reading-test.service";
import {ResultsModel} from "../../models/resultsModel";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  readingSpeed!: number;
  results!: number;
  highScore!: number
  wpm!: number

  constructor(private handlerService: HandlerService,
              private readingService: ReadingTestService) {
  }

  ngOnInit(): void {
    this.handlerService.currentResults.subscribe(results => this.results = results);
    this.handlerService.currentSpeed.subscribe(readingSpeed => this.readingSpeed = readingSpeed);
    this.highScore = this.handlerService.getHighScore();
    this.wpm = this.handlerService.getReadingSpeed();
  }

  submitResults(): void {
    if (this.readingSpeed > 0) {
      let resultsModel: ResultsModel = {
        readingSpeed: this.readingSpeed,
        highScore: this.results
      }
      this.readingService.submitResults(resultsModel).subscribe(() => {
        this.handlerService.updateHighScore(this.readingSpeed);
        this.handlerService.updateReadingSpeed(this.results);
        this.highScore = this.results;
        this.wpm = this.readingSpeed;
      });
    }
  }

}
