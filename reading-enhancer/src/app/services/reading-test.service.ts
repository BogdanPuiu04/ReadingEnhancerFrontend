import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReadingText} from "../models/readingText";
import {environment} from "../../environments/environment";
import {AllReadingTextsResponse} from "../models/allReadingTextResponse";
import {ReadingTextResponseModel} from "../models/readingTextResponseModel";
import {ResultsModel} from "../models/resultsModel";

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
}
