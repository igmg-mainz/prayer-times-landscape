import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'cr-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  private currentDate;
  constructor() {}

  ngOnInit() {
    const boundedTimer = timer(0, 1000);
    boundedTimer.subscribe(() => {
      this.updateTime();
    });
  }


  private updateTime() {

    this.currentDate = new Date();
    const sec = this.currentDate.getSeconds() / 60;
    const min = this.currentDate.getMinutes() / 60;
    const hr = this.currentDate.getHours() / 12;

    (document.querySelector('#sc') as HTMLElement).style.transform = `rotateZ(${sec * 360}deg)`;
    (document.querySelector('#mn') as HTMLElement).style.transform = `rotateZ(${min * 360}deg)`;
    (document.querySelector('#hr') as HTMLElement).style.transform = `rotateZ(${hr * 360}deg)`;

  }

}
