import {Component, Input, OnInit} from '@angular/core';
import {ReadingText} from "../../../models/readingText";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
      answer: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    console.log(this.form.value)
  }

  ngOnInit(): void {
    this.initForm();
  }

}
