import {Component, Input, OnInit} from '@angular/core';
import {ReadingText} from "../../../models/readingText";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HandlerService} from "../../../services/handler.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() text!: ReadingText;
  rightAnswers: number = 0;
  @Input() wpm!: number;
  form!: FormGroup;
  test!: string;

  options: { [key: string]: any[] } = {}
  option: any = [];
  answers = new Map<string, string>([]);


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private handlerService: HandlerService) {
  }


  initForm(): void {
    this.form = this.formBuilder.group({
      answer: Validators.required,
    });
  }

  onSubmit(): void {
    let keys = Object.values(this.options);
    let values = Object.keys(this.options);
    let count = 0;
    let stringKeys = keys.toString().split(',');
    let stringValues = values.toString().split(',');
    for (let i = 0; i < keys.length; i++) {
      this.answers.set(stringValues[i], stringKeys[i])
    }
    for (let [key, value] of this.answers.entries()) {
      let q = this.text.questionsList.filter(question => question.id === key)[0];
      let answer = q.answers.filter(ans => ans.id === value)[0];
      if (!answer.isCorrect) {
        count++;
      }
    }
    this.rightAnswers = this.text.questionsList.length - count;
    if (this.form.valid) {
      this.handlerService.updateResults(this.wpm, Math.round((this.rightAnswers / this.text.questionsList.length * 100) * 100) / 100);
      this.router.navigate(['results']);
    }
  }

  ngOnInit(): void {
    this.handlerService.currentResults.subscribe(rightAnswers => this.rightAnswers = rightAnswers);
    this.initForm();
  }

  isValid(): boolean {
    let keys = Object.keys(this.options);
    return keys.length >= this.text.questionsList.length;
  }
}

