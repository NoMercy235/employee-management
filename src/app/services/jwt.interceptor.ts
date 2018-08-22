import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    protected cookieService: CookieService,
  ) {}

  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt = this.cookieService.get('jwtToken');
    if (jwt) {
      req = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${jwt}`
        })
        }
      );
    }
    return next.handle(req);
  }
}
