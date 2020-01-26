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
  private timerSubscription;

  private leftTime: number;
  private announcements$: Observable<Array<Announcement>>;

  constructor(private prayerService: PrayerService,
              private timeService: TimeService,
              private announcementService: AnnouncementService,
              public router: Router) {
  }


  ngOnInit() {
    this.initDate();
    this.initAndStartTimer();
    this.initLeftTime();
    this.initAndShowAnnouncements();
  }

  onTimerFinished() {
    this.initLeftTime();
  }

  getLeftTime() {
    return this.leftTime;
  }

  private initAndStartTimer() {
    const boundedTimer = timer(0, 1000);
    this.timerSubscription = boundedTimer.subscribe(() => {
      this.updateTime();
      this.prayerService.updatePrayers(this.currentDate);
      this.refreshWindowAtMidnight();
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
      window.location.reload();
      // this.prayerService.prayerChangedSubject.next(null);
    }
  }

  private initAndShowAnnouncements() {
    this.announcements$ = this.announcementService.getAnnouncements();

    this.prayerService.prayerChangedSubject.subscribe(prayer => {

      const today = new Date(this.currentDate);
      if (prayer) {

        this.announcements$.subscribe(announcements => {
          // filter criteria
          // 1. a.begin < currentDate < a.end
          // 2. show only once each prayer-change

          const showMe = announcements.find(announcement => {
            const begin = new Date(announcement.scheduler.begin);
            begin.setHours(0, 0, 0);

            const end = new Date(announcement.scheduler.end);
            end.setHours(23, 59, 59);

            const announcementHistory = this.announcementService.history.get(announcement.announcementId);

            const previousPrayer = announcementHistory !== undefined ? announcementHistory.prayer : null;
            const isNotSamePrayer = previousPrayer === null || JSON.stringify(previousPrayer) !== JSON.stringify(prayer);

            return (today >= begin && today < end) && isNotSamePrayer;
          });

          if (showMe) {
            this.announcementService.history.set(showMe.announcementId, { date: today, prayer, announcement: showMe });
            this.timerSubscription.unsubscribe();

            const timeout = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
            setTimeout(() => {
              this.router.navigate(['/announcement', showMe.announcementId]);
            }, timeout);

          }
        });

      }
    });

  }

}
