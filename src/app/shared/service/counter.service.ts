import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private counter = 0;
  private map: Map<string, number> = new Map<string, number>();

  constructor() {}


  getAndIncrement(announcementId: string) {
    const value = this.counter++;
    this.map.set(announcementId, value);
    return value;
  }

  resetCounter(announcementId: string) {
    this.map.set(announcementId, 0);
  }
}
