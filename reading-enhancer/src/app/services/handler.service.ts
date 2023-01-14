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

  checkIfUserIsAdmin(): boolean {
    const user = this.getUserFromStorage();
    return user.isAdmin;
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

  getHighScore(): number {
    const highScore = JSON.parse(localStorage['userInfo']);
    return highScore.highScore;
  }

  getReadingSpeed(): number {
    const readingSpeed = JSON.parse(localStorage['userInfo']);
    return readingSpeed.readingSpeed;
  }

  updateHighScore(highScore: number): any {
    const user = this.getUserFromStorage();
    user.highScore = highScore;
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  updateReadingSpeed(readingSpeed: number): any {
    const user = this.getUserFromStorage();
    user.readingSpeed = readingSpeed;
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

}
