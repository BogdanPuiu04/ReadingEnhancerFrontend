import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HandlerService} from "./handler.service";
import {UserModel} from "../models/user.model";
import {environment} from "../../environments/environment";
import {userCredentialsModel} from "../models/userCredentialsModel";
import {userRequestData} from "../models/userRequestData.model";
import {Observable} from "rxjs";
import {RegisterUserModel} from "../models/registerUserModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidCredentials = false;
  private refreshTokenTimeout: any;


  constructor(
    private router: Router,
    private http: HttpClient,
    private handlerService: HandlerService
  ) {
  }

  register(user: RegisterUserModel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*'
    })
    console.log(user);
    const body = JSON.stringify(user);
    return this.http.post<userRequestData>(`${environment.baseUrl}/api/User/register`,
      body,
      {
        headers
      })
  }

  login(user: UserModel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*'
    })

    const body = JSON.stringify(user);
    return this.http.post<userRequestData>(
      `${environment.baseUrl}/api/User/authenticate`,
      body,
      {
        headers,
      }
    )
  }

  logout(): void {
    this.stopRefreshToken();
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/User/refresh-token`, null)
  }

  startRefreshToken(): void {
    const jwtToken = JSON.parse(
      window.atob(this.handlerService.getTokenFromLocalStorage().split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    const user: userCredentialsModel = this.handlerService.getUserFromStorage();

    this.refreshTokenTimeout = setTimeout(
      () =>
        this.refreshToken().subscribe({
          next: (res: userRequestData) => {
            if (res.isSuccessful) {
              console.log(res.data.token);
              user.token = res.data.token;
              localStorage.setItem('userInfo', JSON.stringify(user));
              this.stopRefreshToken();
              this.startRefreshToken();
            } else {
              this.stopRefreshToken();
              this.logout();
            }
          },
          error: () => {
            this.stopRefreshToken();
            this.logout();
          }
        }), timeout
    )
  }

  stopRefreshToken(): void {
    clearTimeout(this.refreshTokenTimeout);
  }
}
