import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HandlerService} from "./handler.service";
import {UserModel} from "../models/user.model";
import {environment} from "../../environments/environment";
import {UserCredentialsModel} from "../models/userCredentials.model";
import {userRequestData} from "../models/userRequestData.model";

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

  login(user: UserModel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*'
    })

    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post<userRequestData>(
      `${environment.baseUrl}/Users/authenticate`,
      body,
      {
        headers,
      }
    )
  }

  logout(): void {
    localStorage.removeItem('userCredentials');
    this.router.navigate(['/login']);
  }

}
