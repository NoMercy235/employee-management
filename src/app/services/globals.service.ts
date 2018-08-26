import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { EmployeeModel } from '../templates/employee.model';

@Injectable()
export class GlobalsService {
  public user: any;
  public employeesQuery = '';
  public employees: EmployeeModel[] = [];

  constructor(
    protected localStorage: LocalStorageService,
  ) {
    this.employees = this.getEmployees();
  }

  setUser(user): void {
    this.user = user;
  }

  private getEmployees() {
    const localEmployees = this.localStorage.get('employees');
    if (localEmployees) {
      return localEmployees.map(e => new EmployeeModel(e));
    } else {
      return [];
    }
  }
}
