import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'em-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public fg: FormGroup;

  constructor(
    protected loginService: LoginService,
    protected cookieService: CookieService,
    protected globalService: GlobalsService,
    protected router: Router,
  ) { }

  public ngOnInit() {
    const jwt = this.cookieService.get('jwtToken');
    if (jwt) {
      this.loginService
        .getMe()
        .subscribe((user) => {
          this.globalService.setUser(user);
          this.goToEmployees();
        });
    }

    this.fg = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  public onSubmit() {
    this.loginService
      .login(this.fg.value)
      .subscribe((auth: any) => {
        this.cookieService.set('jwtToken', auth.token);
        this.globalService.setUser(auth.user);
        this.goToEmployees();
      });
  }

  private goToEmployees(): void {
    this.router.navigateByUrl('/employees');
  }
}
