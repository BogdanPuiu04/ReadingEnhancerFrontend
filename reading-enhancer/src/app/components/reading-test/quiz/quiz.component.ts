import {Component, Input, OnInit} from '@angular/core';
import {ReadingText} from "../../../models/readingText";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() text!: ReadingText;
  form!: FormGroup;
  test!: string;

  options: any = [];
  option: any = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }


  initForm(): void {
    this.form = this.formBuilder.group({
      answer: Validators.required
    });
  }

  onSubmit(): void {
    console.log(this.options)
    if (this.form.valid) {
      this.router.navigate(['results'], {relativeTo: this.route});
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

}
