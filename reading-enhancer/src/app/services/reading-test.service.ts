import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReadingText} from "../models/readingText";
import {environment} from "../../environments/environment";
import {AllReadingTextsResponse} from "../models/allReadingTextResponse";
import {ReadingTextResponseModel} from "../models/readingTextResponseModel";
import {ResultsModel} from "../models/resultsModel";
import {AllUserHighScores} from "../models/allUserHighscores";
import {DeleteQuestionModel} from "../models/deleteQuestionModel";
import {DeleteAnswerModel} from "../models/DeleteAnswerModel";
import {AllUsersResponseModel} from "../models/allUsersResponseModel";
import {AppResponse} from "../models/appResponse";

@Injectable({
  providedIn: 'root'
})
export class ReadingTestService {

  constructor(private router: Router,
              private http: HttpClient,) {
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': '*'
  });

  getText(): Observable<ReadingTextResponseModel> {
    return this.http.get<ReadingTextResponseModel>(`${environment.baseUrl}/api/EnhancedText/GetRandomText`);
  }

  getAllText(): Observable<AllReadingTextsResponse> {
    return this.http.get<AllReadingTextsResponse>(`${environment.baseUrl}/api/EnhancedText`);
  }

  submitChangedText(readingText: ReadingText): Observable<any> {
    const body = JSON.stringify(readingText);
    return this.http.post<any>(`${environment.baseUrl}/api/EnhancedText/ChangeText`, body, {headers: this.headers});
  }

  submitNewText(readingText: ReadingText): Observable<ReadingText> {
    const body = JSON.stringify(readingText);
    return this.http.post<ReadingText>(`${environment.baseUrl}/api/EnhancedText/AddNewText`, body, {headers: this.headers});
  }

  submitResults(resultsModel: ResultsModel) {
    const body = JSON.stringify(resultsModel);
    return this.http.post<any>(`${environment.baseUrl}/api/User/SubmitResults`, body, {headers: this.headers});
  }

  getTopHighScores(): Observable<AllUserHighScores> {
    return this.http.get<AllUserHighScores>(`${environment.baseUrl}/api/User/GetUsersHighScore`);
  }

  deleteText(textId: string): Observable<any> {
    const body = JSON.stringify(textId);
    return this.http.post<any>(`${environment.baseUrl}/api/EnhancedText/DeleteText`, body, {headers: this.headers});
  }

  deleteQuestion(textId: string, questionId: string): Observable<any> {
    let questionModel: DeleteQuestionModel = {
      textId: textId,
      questionId: questionId
    };
    const body = JSON.stringify(questionModel)
    return this.http.post<string>(`${environment.baseUrl}/api/EnhancedText/DeleteQuestion`, body, {headers: this.headers});
  }

  deleteAnswer(textId: string, questionId: string, answerId: string) {
    let answerModel: DeleteAnswerModel = {
      textId: textId,
      questionId: questionId,
      answerId: answerId
    }
    const body = JSON.stringify(answerModel);
    return this.http.post<string>(`${environment.baseUrl}/api/EnhancedText/DeleteAnswer`, body, {headers: this.headers});
  }

  getAllUsers(): Observable<AllUsersResponseModel> {
    return this.http.get<AllUsersResponseModel>(`${environment.baseUrl}/api/User/GetAllUsers`);
  }

  changeAdmin(userId: string): Observable<AppResponse>{
    const body= JSON.stringify(userId);
    return this.http.post<AppResponse>(`${environment.baseUrl}/api/User/ChangeAdminRights`,body,{headers:this.headers});
  }
}
