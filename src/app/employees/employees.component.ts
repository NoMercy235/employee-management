import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'em-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(
    public globalsService: GlobalsService,
  ) { }

  ngOnInit() {
  }

}
