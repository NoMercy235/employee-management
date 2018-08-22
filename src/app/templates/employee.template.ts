import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'em-employee-template',
  templateUrl: './employee.template.html',
})

export class EmployeeTemplateComponent implements OnInit {
  @ViewChild('template') template: ElementRef;
  public fg: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.fg = new FormGroup({
      name: new FormControl(''),
      hireDate: new FormControl(''),
    });
  }

  public getTemplate(): ElementRef {
    return this.template;
  }

  public onSubmit(): void {
    this.fg.reset({ name: '', hireDate: '' });
  }
}
