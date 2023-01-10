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
import {ResultComponent} from "./components/result/result.component";
import {BeginComponent} from "./components/begin/begin.component";
import {ChangeTestComponent} from "./components/change-test/change-test.component";
import {AdminGuard} from "./services/admin-handlers/admin.guard";

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
    canActivate: [AuthGuard],
  },
  {
    path: 'results',
    component: ResultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'begin',
    component: BeginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-test',
    component: ChangeTestComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
