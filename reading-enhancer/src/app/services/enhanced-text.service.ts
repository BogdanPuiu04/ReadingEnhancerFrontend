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
    console.log(this.http.post<any>(
      'https://gorest.co.in/public/v2/users', text, {
        headers: headers
      }
    )
      .pipe(map(obj => obj.id)
      ))
    const content = JSON.stringify(text);
    return this.http.get<any>(
      'https://gorest.co.in/public/v2/users/9'
    ).pipe(map(obj => obj.id));
  }
}
