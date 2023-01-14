import {Component, OnInit, Output} from '@angular/core';
import {ReadingText} from "../../models/readingText";
import {ReadingTestService} from "../../services/reading-test.service";
import {Question} from "../../models/question";
import {Answer} from "../../models/answers";
import {EnhancedTextService} from "../../services/enhanced-text.service";

@Component({
  selector: 'app-change-test',
  templateUrl: './change-test.component.html',
  styleUrls: ['./change-test.component.scss']
})
export class ChangeTestComponent implements OnInit {

  @Output() texts: ReadingText[] = [];
  isChanged: boolean[] = [];
  newQuestion: string = '';
  newAnswer: string = '';
  newText: string = '';

  constructor(private readingService: ReadingTestService) {
  }

  ngOnInit(): void {
    this.getAllTexts();
  }

  getAllTexts(): void {
    this.readingService.getAllText().subscribe((data) => {
      data.texts.forEach(text => {
        this.texts.push(text);
        this.isChanged.push(false);
      });
    });
  }

  getFirstTenWords(text: string): string {
    return text.split(' ').slice(0, 10).join(' ');
  }

  // TODO: add change submit and question/answer add
  editText(textId: string): void {

  }

  public saveText(text: ReadingText, newName: string, index: number): void {
    this.isChanged[index] = true;
    text.text = newName;
  }

  public saveQuestion(question: Question, newName: string, index: number): void {
    this.isChanged[index] = true;
    question.text = newName;
  }

  public saveAnswer(answer: Answer, newName: string, index: number): void {
    this.isChanged[index] = true;
    answer.text = newName;
  }

  changeValueOfAnswer(answer: Answer, index: number): void {
    this.isChanged[index] = true;
    answer.isCorrect = !answer.isCorrect;
  }

  submitChanges(text: ReadingText, index: number): void {
    this.readingService.submitChangedText(text).subscribe(() => {
      this.isChanged[index] = false;
    });
  }

  addQuestion(textId: string, questionText: string, index: number) {
    this.texts.forEach(text => {
      if (text.id == textId) {
        let q = new Question();
        q.text = questionText;
        q.answers = [];
        q.id = 'not'.repeat(8);
        text.questionsList.push(q);
      }
    });
    this.isChanged[index] = true;
    this.newQuestion = '';
  }

  addAnswer(textId: string, questionId: string, answerText: string, index: number) {
    this.texts.forEach(text => {
      if (text.id == textId) {
        text.questionsList.forEach(question => {
          if (question.id == questionId) {
            let a = new Answer();
            a.text = answerText;
            a.id = 'not'.repeat(8);
            a.isCorrect = false;
            question.answers.push(a);
          }
        })
      }
    })
    this.isChanged[index] = true;
    this.newAnswer = '';
  }

  addNewText(text: string) {
    let readingText = new ReadingText();
    readingText.id = 'not'.repeat(8);
    readingText.text = text;
    readingText.questionsList = [];
    this.readingService.submitNewText(readingText).subscribe((data) => {
        this.texts.push(data);
      }
    )
    this.newText = '';
  }


}
