import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { PrayerService } from '../shared/service/prayer.service';
import { Prayer } from '../shared/model/prayer';
import { TimeService } from '../shared/service/time.service';
import { AnnouncementService } from '../shared/service/announcement.service';
import { Announcement } from '../shared/model/announcement';
import { Router } from '@angular/router';

@Component({
  selector: 'cr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public currentDate: Date;
  public currentDateSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.currentDate);
  public nextPrayer$: Observable<Prayer>;


  private leftTime: number;
  private announcements: Announcement[];

  constructor(private prayerService: PrayerService,
              private timeService: TimeService,
              private announcementService: AnnouncementService,
              public router: Router) {
    console.log('DashboardComponent constructor');
  }


  ngOnInit() {
    console.log('DashboardComponent ngOnInit');
    this.initDate();
    this.initAndStartTimer();
    this.initLeftTime();
    this.initAnnouncements();
  }

  onTimerFinished() {
    this.initLeftTime();
  }

  getLeftTime() {
    return this.leftTime;
  }

  private initAndStartTimer() {
    const boundedTimer = timer(0, 1000);
    boundedTimer.subscribe(() => {
      this.updateTime();
      this.prayerService.updatePrayers(this.currentDate);
      this.refreshWindowAtMidnight();
      this.showAnnouncements();
    });
  }

  private showAnnouncements() {
    this.prayerService.prayerChangedSubject.subscribe(prayer => {
      if (prayer) {

        console.log(prayer);
        if (this.announcements === undefined) {
          this.initAnnouncements();
        }

        const showMe = this.announcements.find(a => a.text);

        if (this.announcementService.counter === 0 && !showMe.isShown) {

          this.announcementService.counter++;
          this.router.navigate(['announcement', showMe.announcementId]);
        }

      }
    });


  }

  private updateTime() {
    this.currentDate = new Date();
    this.currentDateSubject.next(this.currentDate);
  }


  private initDate() {
    this.currentDate = new Date();
  }

  private initLeftTime() {
    this.prayerService.nextPrayerSubject.subscribe(prayer => {
      if (prayer) {
        const dateOfPrayer = this.timeService.parseToDate(prayer.time);
        this.leftTime = this.timeService.getTimeLeftTo(dateOfPrayer);
        this.nextPrayer$ = of(prayer);
      }
    });
  }

  private refreshWindowAtMidnight() {
    const midnight = this.timeService.isMidnight(this.currentDate);
    if (midnight) {
      this.prayerService.prayerChangedSubject.next(null);
      this.initAnnouncements();
    }
  }

  private initAnnouncements() {
    this.announcementService.getAnnouncements().subscribe(announcements => {
      this.announcements = announcements;
    });
  }
}
