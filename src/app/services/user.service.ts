import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginForm } from 'src/app/models/LoginForm';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.baseUrl + '/users';

  constructor(private httpClient: HttpClient) { }

  login(input: LoginForm): Observable<string> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    // We send our 'input' as the body of our request
    return this.httpClient.post<string>(this.url, input, httpHead);
  }
}
