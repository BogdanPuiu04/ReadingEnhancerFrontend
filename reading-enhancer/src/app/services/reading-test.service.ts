import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReadingText} from "../models/readingText";
import {environment} from "../../environments/environment";
import {AllReadingTextsResponse} from "../models/allReadingTextResponse";
import {ReadingTextResponseModel} from "../models/readingTextResponseModel";

@Injectable({
  providedIn: 'root'
})
export class ReadingTestService {

  constructor(private router: Router,
              private http: HttpClient,) {
  }

  getText(): Observable<ReadingTextResponseModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*'
    });
    return this.http.get<ReadingTextResponseModel>(`${environment.baseUrl}/api/EnhancedText/GetRandomText`);
  }

  getAllText(): Observable<AllReadingTextsResponse> {
    return this.http.get<AllReadingTextsResponse>(`${environment.baseUrl}/api/EnhancedText`);
  }

  submitChangedText(readingText: ReadingText): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*'
    });
    const body = JSON.stringify(readingText);
    return this.http.post<any>(`${environment.baseUrl}/api/EnhancedText/ChangeText`, body, {headers: headers});
  }
}
