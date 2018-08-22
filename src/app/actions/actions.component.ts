import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from '../services/globals.service';
import { LocalStorageService } from 'angular-web-storage';
import { EmployeeTemplateComponent } from '../templates/employee.template';

@Component({
  selector: 'em-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(
    protected modalService: NgbModal,
    protected globalsService: GlobalsService,
    protected localStorage: LocalStorageService,
  ) { }

  ngOnInit() {
  }

  public openModal() {
    this.modalService
      .open(EmployeeTemplateComponent)
      .result
      .then(
        (result) => {
          this.globalsService.employees.push(result);
          this.localStorage.set('employees', this.globalsService.employees);
        },
        reason => {},
      );
  }

}
