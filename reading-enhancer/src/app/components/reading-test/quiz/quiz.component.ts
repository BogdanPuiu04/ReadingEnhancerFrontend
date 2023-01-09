import {Component, Input, OnInit, Output} from '@angular/core';
import {ReadingText} from "../../../models/readingText";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
    let count = 0;
    keys.forEach(x => {
      // @ts-ignore
      if (x === "false")
        count++;
    });
    this.rightAnswers = this.text.questionsList.length - count;
    if (this.form.valid) {
      this.handlerService.updateResults(this.wpm, this.rightAnswers / this.text.questionsList.length * 100);
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
