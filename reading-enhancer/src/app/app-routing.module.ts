import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./services/login-handlers/auth.guard";
import {LoggedInGuard} from "./services/login-handlers/logged-in.guard";
import {RegisterComponent} from "./components/register/register.component";
import {RegisterGuard} from "./services/register-handlers/register.guard";
import {UrlComponent} from "./components/url/url.component";
import {ReadingTestComponent} from "./components/reading-test/reading-test.component";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RegisterGuard]
  },
  {
    path: 'webpage',
    component: UrlComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'minigame',
    component: ReadingTestComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
