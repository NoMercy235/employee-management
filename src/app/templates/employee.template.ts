import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'em-employee-template',
  templateUrl: './employee.template.html',
})

export class EmployeeTemplateComponent implements OnInit {
  @Input('value') value: any = {};
  public fg: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
    this.fg = new FormGroup({
      name: new FormControl(this.value.name || ''),
      hireDate: new FormControl(this.value.hireDate || ''),
    });
  }

  public onSubmit(): void {
    this.activeModal.close(this.fg.value);
    this.fg.reset({ name: '', hireDate: '' });
  }
}
