import {Component, Input, OnInit} from '@angular/core';
import {ReadingText} from "../../../models/readingText";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() text!: ReadingText;
  form!: FormGroup;
  test!: string;

  constructor(private formBuilder: FormBuilder) {
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      answer: Validators.required
    });
  }

  onSubmit(): void {

  }

  ngOnInit(): void {
    console.log(this.text.questionsList)
    this.initForm();
  }

}
