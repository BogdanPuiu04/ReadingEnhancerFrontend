import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  constructor() {
  }


  getUserFromStorage(): any {
    return JSON.parse(localStorage['userInfo']);
  }

  getTokenFromLocalStorage(): any {
    const userToken = JSON.parse(localStorage['userInfo']);
    return userToken.token;
  }

  checkStorageForUser(): boolean {
    return !localStorage.getItem('userInfo');
  }

  checkIfUserWantsToRegister(): boolean{
    return !!localStorage.getItem('registerAttempt');
  }

  getUserCredentialsFromStorage(): any {
    if (localStorage['userCredentials']) {
      return JSON.parse(localStorage['userCredentials']);
    }
  }


}
