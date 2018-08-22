import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'em-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title: string;

  ngOnInit () {
    this.title = 'My app';
  }
}
