import { Component, OnInit } from '@angular/core';
import { TurkishMonth } from '../shared/model/turkish-month';

@Component({
  selector: 'cr-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  public currentDate: Date;

  constructor() { }

  ngOnInit() {
    this.currentDate = new Date();
  }

  translateMonth() {
    return TurkishMonth[this.currentDate.getMonth()] + ' ' + this.currentDate.getFullYear();
  }
}
