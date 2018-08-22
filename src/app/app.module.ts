import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionsComponent } from './actions/actions.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { APP_ROUTES } from './app.routes';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionsComponent,
    LoginComponent,
    EmployeesComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
