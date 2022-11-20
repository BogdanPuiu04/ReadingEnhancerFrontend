import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FormComponent } from './components/main-page/form/form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import { InputComponent } from './shared/input/input.component';
import {InlineSVGModule} from "ng-inline-svg-2";
import { ButtonComponent } from './shared/button/button.component';
import {EnhancedTextService} from "./services/enhanced-text.service";
import { HttpClientModule} from "@angular/common/http";
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    InlineSVGModule,
    HttpClientModule
  ],
  providers: [
    EnhancedTextService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
