import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  private basicResults = new BehaviorSubject<number>(0);
  private basicSpeed = new BehaviorSubject<number>(0);

  currentResults = this.basicResults.asObservable();
  currentSpeed = this.basicSpeed.asObservable();


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

  checkIfUserWantsToRegister(): boolean {
    return !!localStorage.getItem('registerAttempt');
  }

  getUserCredentialsFromStorage(): any {
    if (localStorage['userCredentials']) {
      return JSON.parse(localStorage['userCredentials']);
    }
  }

  updateResults(readingSpeed: number, results: number): any {
    this.basicResults.next(results);
    this.basicSpeed.next(readingSpeed);
  }

}
