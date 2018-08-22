import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'em-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [
    NgbDropdownConfig,
  ]
})
export class HeaderComponent implements OnInit {
  constructor(
    public config: NgbDropdownConfig,
    public loginService: LoginService,
    protected cookieService: CookieService,
    protected router: Router,
  ) {
    config.placement = 'bottom-right';
  }

  public ngOnInit(): void {}

  public onLogout(): void {
    this.cookieService.delete('jwtToken');
    this.router.navigateByUrl('/');
  }

}
