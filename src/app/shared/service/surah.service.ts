import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, retryWhen, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Surah } from '../model/surah';
import { AuthService } from './auth.service';

// const uri = 'https://digital-prayer.herokuapp.com/quran/surah/random';
// const uri = 'http://localhost:8092/quran/surah/random';
const uri = 'https://h2861894.stratoserver.net/services/DigitalPrayerServer/quran/surah/random';


@Injectable({
  providedIn: 'root'
})
export class SurahService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getRandomSurah(): Observable<Surah> {

    const headers = this.authService.getBasicWithHeader();

    return this.http.get<Surah>(uri, headers)
      .pipe(retryWhen(errors => errors.pipe(delay(5000),
        take(5)))
      );
  }
}
