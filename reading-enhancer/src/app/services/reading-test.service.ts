import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReadingText} from "../models/readingText";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReadingTestService {

  constructor(private router: Router,
              private http: HttpClient,) {
  }

  getText(): Observable<ReadingText> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*'
    });
    return this.http.get<ReadingText>(`${environment.baseUrl}/api/EnhancedText/GetRandomText`);
  }
}
