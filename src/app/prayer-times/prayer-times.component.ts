import { Component, OnInit } from '@angular/core';
import { PrayerTimes } from '../shared/model/prayer-times';
import { PrayerService } from '../shared/service/prayer.service';
import { Observable } from 'rxjs';
import { LocationService } from '../shared/service/location.service';
import { TranslationService } from '../shared/service/translation.service';

@Component({
  selector: 'cr-prayer-times',
  templateUrl: './prayer-times.component.html',
  styleUrls: ['./prayer-times.component.css']
})
export class PrayerTimesComponent implements OnInit {

  prayerTimes$: Observable<PrayerTimes>;

  constructor(private prayerService: PrayerService,
              private locationService: LocationService,
              private translationService: TranslationService) { }

  ngOnInit() {
    this.initData();
    this.prayerService.prayerChangedSubject.subscribe(prayer => {
      this.initData();
    });
  }


  private initData() {
    const myDate = new Date();
    const month = myDate.getMonth().toString();
    this.prayerTimes$ = this.prayerService.getPrayers(month, this.locationService.getLocation());
  }


  getDisplayName(): string {
    return this.translationService.translateToDisplayName(this.locationService.getLocation());
  }
}
