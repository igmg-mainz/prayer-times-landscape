import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Asma } from '../model/asma';
import { delay, retryWhen, take } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AsmaService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private apiService: ApiService) {
  }

  getRandomAsma(): Observable<Asma> {
    const headers = this.authService.getBasicWithHeader();
    const uri = this.apiService.randomAsma();

    return this.http.get<Asma>(uri, headers)
      .pipe(retryWhen(errors => errors.pipe(delay(15000),
        take(10)))
      );
  }

}
