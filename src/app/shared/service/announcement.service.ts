import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, delay, map, retryWhen, switchMap, take } from 'rxjs/operators';
import { Announcement } from '../model/announcement';
import { AnnouncementHistory } from '../model/announcement-history';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  public counter = 0;
  public history = new Map<string, AnnouncementHistory>();
  private announcements: Array<Announcement>;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private apiService: ApiService) {
  }

  /**
   * return all available announcements from server
   */
  getAnnouncements() {

    const uri = this.apiService.announcements();
    const httpOptions = this.authService.getBasicWithHeader();

    return this.http.get<Array<Announcement>>(`${uri}`, httpOptions)
      .pipe(
        retryWhen(errors => errors.pipe(delay(5000), take(10))),
        map(list => this.announcements = list),
        catchError(this.handleError)
      );
  }

  /**
   * return a single announcement by id
   *
   * @param announcementId id of announcement
   */
  getAnnouncementById(announcementId: string) {

    const uri = this.apiService.announcement(announcementId);
    const httpOptions = this.authService.getBasicWithHeader();

    return this.http.get<Announcement>(uri, httpOptions)
      .pipe(
        retryWhen(errors => errors.pipe(delay(5000), take(10))),
        catchError(this.handleError)
      );
  }

  downloadImage(name: string) {

    const uri = this.apiService.announcementImage(name);
    const httpOptions = this.authService.getBasicHeaderAsBlob();

    return this.http.get(uri, httpOptions)
      .pipe(
        switchMap(response => {
          return this.readFile(response);
        })
      );
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

  private readFile(blob: Blob): Observable<string> {
    return Observable.create(obs => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }


}
