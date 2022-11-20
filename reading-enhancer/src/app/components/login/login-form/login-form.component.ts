import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup

  invalidCredentials = false;

  constructor(


  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
