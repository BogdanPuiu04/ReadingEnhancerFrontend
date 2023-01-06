import {Component, OnInit} from '@angular/core';
import {HandlerService} from "../../services/handler.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  questionsCount!: number;
  readingSpeed!: number;
  results!: number;
  constructor(private handlerService: HandlerService) {
  }

  ngOnInit(): void {
    this.handlerService.currentResults.subscribe(results => this.results = results);
    this.handlerService.currentSpeed.subscribe(readingSpeed => this.readingSpeed = readingSpeed);
    this.handlerService.currentQuestionsCount.subscribe(questionsCount => this.questionsCount = questionsCount)
  }

}
