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

    this.currentDate = new Date();
    const sec = this.currentDate.getSeconds() / 60;
    const min = this.currentDate.getMinutes() / 60;
    const hr = this.currentDate.getHours() / 12;

    const scElement = (document.querySelector('#sc') as HTMLElement);
    const mnElement = (document.querySelector('#mn') as HTMLElement);
    const hrElement = (document.querySelector('#hr') as HTMLElement);

    if (scElement && mnElement && hrElement) {
      scElement.style.transform = `rotateZ(${sec * 360}deg)`;
      mnElement.style.transform = `rotateZ(${min * 360}deg)`;
      hrElement.style.transform = `rotateZ(${hr * 360}deg)`;
    }

  }

}
