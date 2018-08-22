import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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
    protected router: Router,
  ) { }

  public ngOnInit() {
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
        this.router.navigateByUrl('/employees');
      });
  }
}
