import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  constructor() {
  }


  getUserFromStorage(): any {
    return JSON.parse(localStorage['user']).name;
  }

  getTokenFromLocalStorage(): any {
    return JSON.parse(localStorage['userCredentials'].token)
  }

  checkStorageForUser(): boolean {
    return !localStorage.getItem('user');
  }

  getUserCredentialsFromStorage(): any {
    if (localStorage['userCredentials']) {
      return JSON.parse(localStorage['userCredentials']);
    }
  }


}
