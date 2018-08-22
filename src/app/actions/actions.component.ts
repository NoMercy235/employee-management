import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'em-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(
    protected modalService: NgbModal,
    protected globalsService: GlobalsService,
  ) { }

  ngOnInit() {
  }

  public openModal(content) {
    this.modalService
      .open(content)
      .result
      .then(
        (result) => {
          this.globalsService.employees.push(result);
          console.log(this.globalsService);
        },
        (reason) => {
          console.log(reason);
        }
      );
  }

}
