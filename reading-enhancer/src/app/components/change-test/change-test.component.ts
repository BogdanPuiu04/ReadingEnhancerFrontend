import {Component, OnInit, Output} from '@angular/core';
import {ReadingText} from "../../models/readingText";
import {ReadingTestService} from "../../services/reading-test.service";
import {Question} from "../../models/question";
import {Answer} from "../../models/answers";
import {UserResponse} from "../../models/allUsersResponseModel";

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
  newText: string = ''
  users: UserResponse[] = [];
  adminError: string[] = [];

  constructor(private readingService: ReadingTestService) {
  }

  ngOnInit(): void {
    this.getAllTexts();
    this.getAllUsers();
  }

  getAllTexts(): void {
    this.readingService.getAllText().subscribe((data) => {
      data.texts.forEach(text => {
        this.texts.push(text);
        this.isChanged.push(false);
      });
    });
  }

  getAllUsers(): void {
    this.readingService.getAllUsers().subscribe((data) => {
      data.allUsers.forEach(user => {
        this.users.push(user);
      })
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
    if (this.isChanged[index]) {
      this.readingService.submitChangedText(text).subscribe(() => {
        this.isChanged[index] = false;
        window.location.reload();
      });
    }
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

  deleteText(textId: string) {
    this.readingService.deleteText(textId).subscribe(() => {
      let removedText = this.texts.filter(text => text.id === textId)[0];
      const index = this.texts.indexOf(removedText);
      this.texts.splice(index, 1);
    })
  }

  deleteQuestion(textId: string, questionId: string) {
    if (!questionId.includes('not')) {
      this.readingService.deleteQuestion(textId, questionId).subscribe(() => {
        this.removeQuestion(textId, questionId);
      })
    } else {
      this.removeQuestion(textId, questionId);
    }
  }

  deleteAnswer(textId: string, questionId: string, answerId: string) {
    if (!answerId.includes('not')) {
      this.readingService.deleteAnswer(textId, questionId, answerId).subscribe(() => {
        this.removeAnswer(textId, questionId, answerId);
      })
    } else {
      this.removeAnswer(textId, questionId, answerId);
    }
  }

  removeQuestion(textId: string, questionId: string) {
    let text = this.texts.filter(text => text.id === textId)[0];
    let indexText = this.texts.indexOf(text);
    let removedQuestion = text.questionsList.filter(q => q.id === questionId)[0];
    const index = text.questionsList.indexOf(removedQuestion);
    text.questionsList.splice(index, 1);
    this.texts[indexText] = text;
  }

  removeAnswer(textId: string, questionId: string, answerId: string) {
    const text = this.texts.filter(text => text.id === textId)[0];
    const indexText = this.texts.indexOf(text);
    const question = text.questionsList.filter(q => q.id === questionId)[0];
    const indexQuestion = text.questionsList.indexOf(question);
    const removedAnswer = question.answers.filter(a => a.id === answerId)[0];
    const index = question.answers.indexOf(removedAnswer);
    question.answers.splice(index, 1);
    text.questionsList[indexQuestion] = question;
    this.texts[indexText] = text;
  }

  changeAdmin(userId: string) {
    this.readingService.changeAdmin(userId).subscribe(data => {
        if (data.isSuccessful) {
          this.changeAdminProprietyInPage(userId);
        }
      },
      error => {
        this.adminError = error.error.Errors[0]
      })
  }

  changeAdminProprietyInPage(userId: string) {
    const user = this.users.filter(user => user.id === userId)[0];
    const index = this.users.indexOf(user);
    user.isAdmin = !user.isAdmin;
    this.users[index] = user;
  }

}
