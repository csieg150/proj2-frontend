import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { LoginForm } from 'src/app/models/LoginForm';
import { SignupForm } from 'src/app/models/SignupForm';

interface userResponse{
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.baseUrl + '/users';

  constructor(private httpClient: HttpClient) { }

  login(input: LoginForm) {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    // We send our 'input' as the body of our request
    return this.httpClient.post<userResponse>(this.url, input, httpHead);
  }

  signup(input: SignupForm): Observable<userResponse>{
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    // We send our 'input' as the body of our request
    return this.httpClient.put<userResponse>(this.url, input, httpHead);
  }
}
