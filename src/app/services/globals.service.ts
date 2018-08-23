import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Injectable()
export class GlobalsService {
  public user: any;
  public employeesQuery = '';
  public employees: any[] = [];

  constructor(
    protected localStorage: LocalStorageService,
  ) {
    this.employees = localStorage.get('employees') || [];
  }

  setUser(user): void {
    this.user = user;
  }
}
