import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModel } from './employee.model';
import { ValidationService } from '../services/validation.service';
import * as moment from 'moment';

@Component({
  selector: 'em-employee-template',
  templateUrl: './employee.template.html',
})

export class EmployeeTemplateComponent implements OnInit {
  @Input('value') value: EmployeeModel = new EmployeeModel();
  public fg: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    protected formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    const convertedDate = {
      day: this.value.hireDate.date(),
      month: this.value.hireDate.month() + 1,
      year: this.value.hireDate.year(),
    };

    this.fg = this.formBuilder.group({
      name: [this.value.name, [Validators.required]],
      hireDate: [convertedDate, [Validators.required]],
      step: [
        this.value.step,
        [Validators.required, ValidationService.isValidStep]
      ],
    });
  }

  public onSubmit(): void {
    const hireDate = moment.utc();
    hireDate.date(this.fg.value.hireDate.day);
    hireDate.month( this.fg.value.hireDate.month - 1);
    hireDate.year(this.fg.value.hireDate.year);
    const employee = new EmployeeModel(this.fg.value);
    employee.hireDate = hireDate;
    this.activeModal.close(employee);
    this.fg.reset(new EmployeeModel());
  }
}
