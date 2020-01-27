import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from, Observable, of, timer } from 'rxjs';
import { PrayerService } from '../shared/service/prayer.service';
import { Prayer } from '../shared/model/prayer';
import { TimeService } from '../shared/service/time.service';
import { AnnouncementService } from '../shared/service/announcement.service';
import { Router } from '@angular/router';
import { AnnouncementWrapper } from '../shared/model/announcement-wrapper';
import { CounterService } from '../shared/service/counter.service';

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
  private wrappers: Array<AnnouncementWrapper>;

  constructor(private prayerService: PrayerService,
              private timeService: TimeService,
              private announcementService: AnnouncementService,
              public router: Router,
              private counterService: CounterService) {
  }


  ngOnInit() {
    this.initDate();
    this.initAnnouncements();
    this.initAndStartTimer();
    this.initLeftTime();
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
      this.showAnnouncements();
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


  private initAnnouncements() {
    // listen to prayer-change
    this.prayerService.prayerChangedSubject.subscribe(currentPrayer => {
      // prayer time changed
      if (currentPrayer) {
        this.announcementService.getAnnouncements().subscribe(announcements => {
          this.wrappers = announcements.map(announcement => {

            const interval = this.prayerService.intervalToNextPrayer(currentPrayer);
            const fixedRate = this.announcementService.calculateRepetition(announcement, interval);
            const maxRepetitionEachPrayer = this.announcementService.calculateMaxRepetition(announcement);

            return { announcement, interval, fixedRate, maxRepetition: maxRepetitionEachPrayer, prayer: currentPrayer };
          });
        });
      }
    });

  }


  private showAnnouncements() {

    if (this.wrappers) {

      this.wrappers.forEach(wrapper => {

        const value = this.counterService.getAndIncrement(wrapper.announcement.announcementId);
        console.log(value);
        const fromHistory = this.announcementService.history.get(wrapper.announcement.announcementId);
        console.log(fromHistory);

        if ( (fromHistory === undefined || fromHistory === null) || fromHistory.repetition < value) {
          this.announcementService.history.set(wrapper.announcement.announcementId, {
            date: this.currentDate,
            prayer: wrapper.prayer,
            announcement: wrapper.announcement,
            repetition: value
          });

          this.router.navigate(['/announcement', wrapper.announcement.announcementId]);
        }

      });

    }


  }
}
