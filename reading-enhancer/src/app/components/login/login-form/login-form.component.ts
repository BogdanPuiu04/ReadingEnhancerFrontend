import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HandlerService} from "../../../services/handler.service";
import {Router} from "@angular/router";
import {userCredentialsModel} from "../../../models/userCredentialsModel";
import {UserModel} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup
  errorMessage!: string

  invalidCredentials = false;
  accountValidationMessages = {
    userName: [
      {type: 'required', message: 'Username is required'},
      {type: 'maxlength', message: 'The username cannot be more than 40 characters long'}
    ],
    password:[
      {type: 'required', message: 'Password is required'}
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
    const userModel: UserModel = this.handlerService.getUserCredentialsFromStorage();
    const user: UserModel = {username: '', password: ''};
    if (userModel) {
      user.username = userModel.username
      user.password = window.atob(userModel?.password);
    }
    this.form = this.formBuilder.group({
      userName: new FormControl(user.username, Validators.compose([
        Validators.required,
        // Validators.pattern('[A-Za-z0-9._%+-]'),
        Validators.minLength(2),
        Validators.maxLength(40)
      ])),
      password: new FormControl(user.password, [Validators.required]),
      credentials: new FormControl(userModel)
    });
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
        if (res.isSuccessful) {
          const userCredentials: userCredentialsModel = {
            name: res.data.name,
            token: res.data.token,
            isAdmin: res.data.isAdmin,
            highScore: res.data.highScore,
            readingSpeed: res.data.readingSpeed
          };
          localStorage.removeItem('userCredentials');
          if (this.form.value.credentials) {
            const userInfo: UserModel = {username, password: window.btoa(password)};
            localStorage.setItem('userCredentials', JSON.stringify(userInfo));
          }
          localStorage.setItem('userInfo', JSON.stringify(userCredentials));
          this.userService.startRefreshToken();
          this.invalidCredentials = false;
          this.router.navigate(['/main']);
        } else {
          this.userService.stopRefreshToken();
          this.invalidCredentials = true;
        }
      },
      error: () => {
        this.invalidCredentials = true;
        this.errorMessage = "Invalid credentials";
      }
    })
  }

  ngOnInit(): void {
    this.initForm();
  }
}
