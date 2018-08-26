import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModel } from './employee.model';
import { ValidationService } from '../services/validation.service';

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
    this.fg = this.formBuilder.group({
      name: [this.value.name, [Validators.required]],
      hireDate: [this.value.hireDate, [Validators.required]],
      step: [
        this.value.step,
        [Validators.required, ValidationService.isValidStep]
      ],
    });
  }

  public onSubmit(): void {
    this.activeModal.close(new EmployeeModel(this.fg.value));
    this.fg.reset(new EmployeeModel());
  }
}
