import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'em-employee-template',
  template: `
  <ng-template #template let-c="close" let-d="dismiss">
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Adauga angajat</h4>
      <button type="button" class="close" aria-label="Close" (click)="d('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      aici e form
    </div>
    <div class="modal-footer">
      <button
        type="button" class="btn btn-primary"
        (click)="d('close')"
      >
        Inchide
      </button>
      <button
        type="button" class="btn btn-primary"
        (click)="c('save')"
      >
        Salveaza
      </button>
    </div>
  </ng-template>
  `
})

export class EmployeeTemplateComponent implements OnInit {
  @ViewChild('template') template: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  public getTemplate(): ElementRef {
    return this.template;
  }
}
