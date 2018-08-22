import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private endpoint = 'http://212.237.26.52:3000/';
  // private headers: Headers = new Headers()

  constructor(
    protected httpClient: HttpClient,
    protected cookieService: CookieService,
  ) {}

  public login (
    credentials: { email: string, password: string},
  ): Observable {
    const url = `${this.endpoint}auth/authenticate`;
    return this.httpClient.post(url, credentials);
  }

  public getMe(): Observable {
    const url = `${this.endpoint}api/user/get_user_with_token`;
    return this.httpClient.get(url);
  }

  public isLoggedIn(): boolean {
    return !!this.cookieService.get('jwtToken');
  }
}
