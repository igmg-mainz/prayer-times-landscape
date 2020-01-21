import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Asma } from '../model/asma';
import { delay, retryWhen, take } from 'rxjs/operators';

// const uri = 'http://localhost:8092/asma';
const uri = 'https://h2861894.stratoserver.net/services/DigitalPrayerServer/asma';


@Injectable({
  providedIn: 'root'
})
export class AsmaService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getRandomAsma(): Observable<Asma> {
    const headers = this.authService.getBasicWithHeader();

    return this.http.get<Asma>(uri, headers)
      .pipe(retryWhen(errors => errors.pipe(delay(5000),
        take(5)))
      );
  }

}
