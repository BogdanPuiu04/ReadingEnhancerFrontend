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

  getUserCredentialsFromStorage(): any {
    if (localStorage['userCredentials']) {
      return JSON.parse(localStorage['userCredentials']);
    }
  }


}
