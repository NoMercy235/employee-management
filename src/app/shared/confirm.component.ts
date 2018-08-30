import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'em-confirm-component',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{ title }}</h4>
      <button
        type="button" class="close" aria-label="Close"
        (click)="activeModal.close(false)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      Doriti sa stergeti urmatoarea resursa:
      <ul>
        <li *ngFor="let r of resources">
          {{ r.label }}
        </li>
      </ul>
    </div>
    <div class="modal-footer">
      <button
        type="button" class="btn btn-primary"
        (click)="activeModal.close(false)"
      >
        Refuz
      </button>
      <button
        type="button" class="btn btn-danger"
        (click)="activeModal.close(true)"
      >
        Confirm
      </button>
    </div>
  `,
})

export class ConfirmComponent implements OnInit {
  @Input('title') title = 'Confirma stergerea';
  @Input('resources') resources: any[];

  constructor(
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
  }
}
