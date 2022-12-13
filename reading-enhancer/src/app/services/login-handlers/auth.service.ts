import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HandlerService } from "../handler.service";

@Injectable()
export class AuthService {
  jwtHelper = new JwtHelperService();

  constructor(private handlerService: HandlerService) {}

  public isAuthenticated(): boolean {
    if (this.handlerService.checkStorageForUser()) {
      return false;
    }
    const token = this.handlerService.getTokenFromLocalStorage();

    return !this.jwtHelper.isTokenExpired(token);
  }
}
