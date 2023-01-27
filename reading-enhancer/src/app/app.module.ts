import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {FormComponent} from './components/main-page/form/form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputComponent} from './shared/input/input.component';
import {InlineSVGModule} from "ng-inline-svg-2";
import {ButtonComponent} from './shared/button/button.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {LoginComponent} from './components/login/login.component';
import {LoginFormComponent} from './components/login/login-form/login-form.component';
import {UserService} from "./services/user.service";
import {AuthService} from "./services/login-handlers/auth.service";
import {appInitializer} from "./shared/app-init.initializer";
import {HandlerService} from "./services/handler.service";
import {TokenInterceptor} from "./services/token.interceptor";
import {RegisterComponent} from './components/register/register.component';
import {RegisterFormComponent} from './components/register/register-form/register-form.component';
import {UrlComponent} from './components/url/url.component';
import {UrlFormComponent} from './components/url/url-form/url-form.component';
import {ModalComponent} from './components/url/url-form/modal/modal.component';
import {ReadingTestComponent} from './components/reading-test/reading-test.component';
import {CdTimerModule} from "angular-cd-timer";
import {QuizComponent} from './components/reading-test/quiz/quiz.component';
import {MatRadioModule} from "@angular/material/radio";
import {ResultComponent} from './components/result/result.component';
import {BeginComponent} from './components/begin/begin.component';
import {ChangeTestComponent} from './components/change-test/change-test.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EditableTextComponent } from './components/change-test/editable-text/editable-text.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {TextFieldModule} from "@angular/cdk/text-field";


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FormComponent,
    InputComponent,
    ButtonComponent,
    NavMenuComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterFormComponent,
    UrlComponent,
    UrlFormComponent,
    ModalComponent,
    ReadingTestComponent,
    QuizComponent,
    ResultComponent,
    BeginComponent,
    ChangeTestComponent,
    EditableTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    InlineSVGModule,
    HttpClientModule,
    CdTimerModule,
    MatRadioModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    TextFieldModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    multi: true,
    deps: [UserService, HandlerService, AuthService]
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
