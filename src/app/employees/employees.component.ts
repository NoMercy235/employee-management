import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../services/globals.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'angular-web-storage';
import { EmployeeTemplateComponent } from '../templates/employee.template';
import { ConfirmComponent } from '../shared/confirm.component';
import { EmployeeModel } from '../templates/employee.model';

@Component({
  selector: 'em-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(
    public globalsService: GlobalsService,
    protected modalService: NgbModal,
    protected localStorage: LocalStorageService,
  ) { }

  ngOnInit() {
  }

  public getEmployees() {
    return this.globalsService.employees
      .filter((e: any) => {
        return e.name.toLowerCase().includes(
          this.globalsService.employeesQuery
        );
      });
  }

  public editEmployee(index: number): void {
    const modalRef: any = this.modalService
      .open(EmployeeTemplateComponent);

    const currentEmployee = this.globalsService.employees[index];
    modalRef.componentInstance.value = currentEmployee;

    modalRef.result
      .then(
        (result) => {
          this.globalsService.employees = this.globalsService.employees.map(
            (e, i) => {
              if (i !== index) { return e; }
              return result;
            }
          );
          this.localStorage.set('employees', this.globalsService.employees);
        },
        reason => {},
      );
  }

  public deleteEmployee(index: number): void {
    const modalRef: any = this.modalService
      .open(ConfirmComponent);

    const currentEmployee = this.globalsService.employees[index];
    modalRef.componentInstance.resources = [
      { label: currentEmployee.name },
    ];

    modalRef.result
      .then(
        (result) => {
          this.globalsService.employees.splice(index, 1);
          this.localStorage.set('employees', this.globalsService.employees);
        },
        reason => {},
      );
  }

  public getObservations(employee: EmployeeModel): string {
    const yellowStep = employee.getExpectedStep(2);
    if (yellowStep !== employee.step) {
      return `Angajatul trebuie sa aiba treapta <b>${yellowStep}</b> in mai putin de doua luni.`;
    }

    const redStep = employee.getExpectedStep(1);
    if (redStep !== employee.step) {
      return `Angajatul trebuie sa aiba treapta <b>${redStep}</b> in mai putin de o luna sau are treapta gresita.`;
    }

    return 'Angajatul are treapta corecta';
  }
}
