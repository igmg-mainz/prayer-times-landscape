import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { PrayerTimes } from '../model/prayer-times';
import { Prayer } from '../model/prayer';
import { TimeService } from './time.service';
import { catchError, delay, map, retryWhen, take, tap } from 'rxjs/operators';
import { Location } from '../model/location';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrayerService {

  private currentPrayer: Prayer;
  private nextPrayer: Prayer;
  public nextPrayerSubject: BehaviorSubject<Prayer> = new BehaviorSubject<Prayer>(this.nextPrayer);
  public prayerChangedSubject: BehaviorSubject<Prayer> = new BehaviorSubject<Prayer>(this.currentPrayer);

  constructor(private http: HttpClient,
              private timeService: TimeService,
              private authService: AuthService) {
  }

  getPrayers(month: string, location: Location): Observable<PrayerTimes> {

    const myDate = new Date();
    const currentDay = this.timeService.getDay(myDate);
    // const uri = `http://localhost:8092/prayers/location/${location}?month=`;
    const uri = `https://h2861894.stratoserver.net/services/DigitalPrayerServer/prayers/location/${location}?month=`;

    const httpOptions = this.authService.getBasicWithHeader();

    return this.http.get<Array<PrayerTimes>>(`${uri}${month}`, httpOptions).pipe(
      retryWhen(errors => errors.pipe(delay(5000), take(10))),
      map(list => list.find(times => this.timeService.getDay(new Date(times.timeStamp)) === currentDay)),
      tap(prayerTimes => {
        this.initCurrentPrayer(prayerTimes);
        this.initNextPrayer(prayerTimes);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * If the current-time is time for pray, after 5 minutes the announcement-service will be called
   * @param prayer
   */
  isCurrentPrayer(prayer: Prayer) {
    return JSON.stringify(this.currentPrayer) === JSON.stringify(prayer);
  }


  /**
   * This function is called each second while marking the current prayer
   * @param currentDate
   */
  updatePrayers(currentDate: Date) {

    if (this.nextPrayer) {
      const equal = this.timeService.isLogicalEqual(this.nextPrayer.time, currentDate);
      if (equal) {
        console.log(equal);
        this.prayerChangedSubject.next(this.nextPrayer);
      }
    }

  }


  private initCurrentPrayer(prayerTimes: PrayerTimes) {
    const currentDate = new Date();

    this.currentPrayer = prayerTimes.prayers.find((prayer, index, array) => {
      const dateOfPrayer = this.timeService.parseToDate(prayer.time);
      const nextPrayer = array[index + 1];

      // shows that the currentTime is behind the ISHAA prayer
      if (!nextPrayer) {
        return true;
      }
      const dateOfNextPrayer = this.timeService.parseToDate(nextPrayer.time);
      return currentDate > dateOfPrayer && currentDate < dateOfNextPrayer;
    });
  }

  private initNextPrayer(prayerTimes: PrayerTimes) {

    this.nextPrayer = prayerTimes.prayers.find(prayer => {
      const date = this.timeService.parseToDate(prayer.time);
      return this.isBefore(date);
    });

    this.nextPrayerSubject.next(this.nextPrayer);
  }


  private isBefore(date: Date) {
    const today = new Date();
    return today < date;
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}
