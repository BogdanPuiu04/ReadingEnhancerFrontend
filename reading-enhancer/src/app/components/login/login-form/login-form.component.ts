import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HandlerService} from "../../../services/handler.service";
import {Router} from "@angular/router";
import {UserCredentialsModel} from "../../../models/userCredentials.model";
import {UserModel} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup

  invalidCredentials = false;
  accountValidationMessages = {
    userName: [
      {type: 'required', message: 'Username is required'},
      {type: 'maxlength', message: 'The username cannot be more than 40 characters long'}
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private handlerService: HandlerService,
    private router: Router,
    private userService: UserService
  ) {
  }

  initForm(): void {
    const userCredentials: UserModel = this.handlerService.getUserCredentialsFromStorage();
    const user: UserModel = {username: '', password: ''};
    if (userCredentials) {
      user.username = userCredentials.username
      user.password = window.atob(userCredentials?.password);
    }
    this.form = this.formBuilder.group({
      userName: new FormControl(user.username, Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%+-]'),
        Validators.minLength(4),
        Validators.maxLength(40)
      ])),
      password: new FormControl(user.password, [Validators.required]),
      credentials: new FormControl(userCredentials)
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.login(this.form.value.userName, this.form.value.password);
    }
  }

  login(username: string, password: string): void {
    const user: UserModel = {
      username,
      password
    };

    this.userService.login(user).subscribe({
      next: (res) => {
        // if(res.succed){}
        // const userCredentials=
      }
    })
  }
}
