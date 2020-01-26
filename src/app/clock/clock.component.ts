import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'cr-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  private currentDate;

  constructor() {
  }

  ngOnInit() {
    const boundedTimer = timer(0, 1000);
    boundedTimer.subscribe(() => {
      this.updateTime();
    });
  }


  private updateTime() {
    const deg = 6;

    this.currentDate = new Date();
    const sec = this.currentDate.getSeconds() * deg;
    const min = this.currentDate.getMinutes() * deg;
    const hr = this.currentDate.getHours() * 30;

    const scElement = (document.querySelector('#sc') as HTMLElement);
    const mnElement = (document.querySelector('#mn') as HTMLElement);
    const hrElement = (document.querySelector('#hr') as HTMLElement);

    if (scElement && mnElement && hrElement) {
      scElement.style.transform = `rotateZ(${sec}deg)`;
      mnElement.style.transform = `rotateZ(${min}deg)`;
      hrElement.style.transform = `rotateZ(${hr + (min / 12)}deg)`;
    }

  }

}
