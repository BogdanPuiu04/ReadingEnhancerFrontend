import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EnhancedTextService {

  constructor(private router: Router,
              private http: HttpClient) {
  }


  enhanceText(text: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*',
    });
    const content = JSON.stringify(text);
    return this.http.post<string>(
      `${environment.baseUrl}/api/EnhancedText/request`,content,
      {headers: headers}
    )
  }
}
