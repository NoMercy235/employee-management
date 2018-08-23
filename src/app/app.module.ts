import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionsComponent } from './actions/actions.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { APP_ROUTES } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './services/jwt.interceptor';
import { GlobalsService } from './services/globals.service';
import { EmployeeTemplateComponent } from './templates/employee.template';
import { CommonModule } from '@angular/common';
import { AngularWebStorageModule } from 'angular-web-storage';
import { DateFormatter } from './services/DateFormatter';

@NgModule({
  declarations: [
    AppComponent,
    ActionsComponent,
    LoginComponent,
    EmployeesComponent,
    HeaderComponent,
    EmployeeTemplateComponent,
  ],
  entryComponents: [
    EmployeeTemplateComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularWebStorageModule,
  ],
  providers: [
    LoginService,
    CookieService,
    GlobalsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: NgbDateParserFormatter,
      useClass: DateFormatter
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
