import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {HandlerService} from "../../../services/handler.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/user.model";
import {userCredentialsModel} from "../../../models/userCredentialsModel";
import {RegisterUserModel} from "../../../models/registerUserModel";
import {ValidationRegisterUserModel} from "../../../models/validationRegisterUserModel";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {


  form!: FormGroup

  invalidCredentials = false;
  accountValidationMessages = {
    userName: [
      {type: 'required', message: 'Username is required.'},
      {type: 'maxlength', message: 'The username cannot be more than 40 characters long.'},
      {type: 'minlength', message: 'The username cannot be less than 4 characters long.'}
    ],
    firstName: [
      {type: 'required', message: ' First name is required.'},
      {type: 'minlength', message: 'The first name cannot be less than 2 characters long.'}
    ],
    lastName: [
      {type: 'required', message: 'Last name is required.'},
      {type: 'minlength', message: 'The last name cannot be less than 2 characters long.'}
    ],
    password: [
      {type: 'required', message: 'Password is required.'},
    ],
    confirmPassword: [
      {type: 'required', message: 'Confirm Password field is required.'},
      {type: "mismatch", message: 'Password mismatch.'}
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
    const userModel: RegisterUserModel = this.handlerService.getUserCredentialsFromStorage();
    const user: ValidationRegisterUserModel = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
    if (userModel) {
      user.firstName = userModel.firstName;
      user.lastName = userModel.lastName;
      user.username = userModel.username;
      user.password = window.atob(userModel?.password);
      user.confirmPassword = window.atob(userModel?.password)
    }
    this.form = this.formBuilder.group({
      lastName: new FormControl(user.lastName, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ])),
      firstName: new FormControl(user.firstName, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ])),
      userName: new FormControl(user.username, Validators.compose([
        Validators.required,
        // Validators.pattern('[A-Za-z0-9._%+-]'),
        Validators.minLength(3),
        Validators.maxLength(40)
      ])),
      password: new FormControl(user.password, [Validators.required]),
      confirmPassword: new FormControl(user.confirmPassword, Validators.compose([
        Validators.required,])),
      credentials: new FormControl(userModel)
    }, {validators: this.mustMatch('password', 'confirmPassword')})
  }

  mustMatch(password: any, confirmPassword: any) {
    return (formGroup: any) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mismatch']) {
        return
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({mismatch: true})
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.register(this.form.value.firstName, this.form.value.lastName, this.form.value.userName, this.form.value.password);
    }
  }

  register(firstName: string, lastName: string, username: string, password: string): void {
    const user: RegisterUserModel = {
      firstName,
      lastName,
      username,
      password
    };

    this.userService.register(user).subscribe({
      next: (res) => {
        if (res.isSuccessful) {
          const userCredentials: userCredentialsModel = {
            name: res.data.name,
            token: res.data.token
          };
          localStorage.removeItem('userCredentials');
          localStorage.removeItem('registerAttempt');
          if (this.form.value.credentials) {
            const userInfo: UserModel = {username, password: window.btoa(password)};
            localStorage.setItem('userCredentials', JSON.stringify(userInfo));
          }
          localStorage.setItem('userInfo', JSON.stringify(userCredentials));
          this.invalidCredentials = false;
          this.router.navigate(['/main']);
        } else {
          this.invalidCredentials = true;
        }
      },
      error: () => {
        this.invalidCredentials = true;
      }
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

}
