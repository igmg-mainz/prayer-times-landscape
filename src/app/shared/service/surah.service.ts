import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, retryWhen, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Surah } from '../model/surah';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class SurahService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private apiService: ApiService) {
  }

  getRandomSurah(): Observable<Surah> {

    const headers = this.authService.getBasicWithHeader();
    const uri = this.apiService.randomSurah();

    return this.http.get<Surah>(uri, headers)
      .pipe(
        retryWhen(errors => errors.pipe(
          delay(15000),
          take(5))
        )
      );
  }
}
