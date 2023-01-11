import {Component, OnInit, Output} from '@angular/core';
import {ReadingText} from "../../models/readingText";
import {ReadingTestService} from "../../services/reading-test.service";
import {Question} from "../../models/question";
import {Answer} from "../../models/answers";

@Component({
  selector: 'app-change-test',
  templateUrl: './change-test.component.html',
  styleUrls: ['./change-test.component.scss']
})
export class ChangeTestComponent implements OnInit {

  @Output() texts: ReadingText[] = [];
  panelOpenState = false;

  constructor(private readingService: ReadingTestService) {
  }

  ngOnInit(): void {
    this.getAllTexts();
  }

  getAllTexts(): void {
    this.readingService.getAllText().subscribe((data) => {
      data.texts.forEach(text => this.texts.push(text));
    });
  }

  getFirstTenWords(text: string): string {
    return text.split(' ').slice(0, 10).join(' ');
  }

  editText(textId: string): void {

  }

  public saveText(text: ReadingText, newName: string): void {
    text.text = newName;
  }

  public saveQuestion(question: Question, newName: string): void {
    question.text = newName;
  }

  public saveAnswer(answer: Answer, newName: string): void {
    answer.text = newName;
  }

  changeValueOfAnswer(answer: Answer): void {
    answer.isCorrect = !answer.isCorrect;
  }

  submitChanges(text: ReadingText): void {
    console.log(text);
  }
}
