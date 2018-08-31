import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from '../services/globals.service';
import { LocalStorageService } from 'angular-web-storage';
import { EmployeeTemplateComponent } from '../templates/employee.template';
import { saveAs } from 'file-saver/FileSaver';
import { EmployeeModel } from '../templates/employee.model';

@Component({
  selector: 'em-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(
    public globalsService: GlobalsService,
    protected modalService: NgbModal,
    protected localStorage: LocalStorageService,
  ) { }

  ngOnInit() {
  }

  public openModal(): void {
    this.modalService
      .open(EmployeeTemplateComponent, { size: 'lg' })
      .result
      .then(
        (result) => {
          this.globalsService.employees.push(result);
          this.localStorage.set('employees', this.globalsService.employees);
        },
        reason => {},
      );
  }

  public exportData(): void {
    const fileContent = JSON.stringify(
      this.localStorage.get('employees'),
    );
    const blob = new Blob(
      [fileContent],
      { type: 'application/json' }
      );
    saveAs(blob, 'angajati.txt');
  }

  public importData(files: any): void {
    const fileReader = new FileReader();
    fileReader.onload = (ev) => {
      const employees = JSON.parse(<string>fileReader.result)
        .map(e => new EmployeeModel(e));
      this.globalsService.employees = employees;
      this.localStorage.set('employees', employees);
    };
    fileReader.readAsText(files[0]);
  }
}
