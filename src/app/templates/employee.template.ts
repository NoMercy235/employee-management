import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModel } from './employee.model';
import { ValidationService } from '../services/validation.service';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'em-employee-template',
  templateUrl: './employee.template.html',
})

export class EmployeeTemplateComponent implements OnInit {
  @Input('value') value: EmployeeModel = new EmployeeModel();
  public fg: FormGroup;
  public isEdit: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    protected formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.isEdit = !!this.value.name;
    const convertedDate = this.value.hireDate ? {
      day: this.value.hireDate.date(),
      month: this.value.hireDate.month() + 1,
      year: this.value.hireDate.year(),
    } : '';

    this.fg = this.formBuilder.group({
      name: [this.value.name, [Validators.required]],
      hireDate: [convertedDate, [Validators.required]],
      experienceMonths: [
        this.value.experienceMonths,
        [Validators.required]
      ],
      step: [
        this.value.step,
        [Validators.required, ValidationService.isValidStep]
      ],
    });
  }

  public onSubmit(): void {
    const employee = new EmployeeModel(this.fg.value);
    employee.hireDate = this.convertDateToMoment(
      this.fg.value.hireDate
    );
    if (!this.isEdit) {
      employee.setStep(
        employee.getHiredMonths() + employee.experienceMonths
      );
    }
    this.activeModal.close(employee);
    this.fg.reset(new EmployeeModel());
  }

  private convertDateToMoment(bsDate): Moment {
    const date = moment.utc();
    date.date(bsDate.day);
    date.month( bsDate.month - 1);
    date.year(bsDate.year);
    return date;
  }
}
