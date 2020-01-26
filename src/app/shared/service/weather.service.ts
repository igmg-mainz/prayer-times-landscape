import { Injectable } from '@angular/core';
import { Location } from '../model/location';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Weather } from '../model/weather';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private apiService: ApiService) { }

  getCurrentWeatherOfLocation(location: Location): Observable<Weather> {
    const httpOptions = this.authService.getBasicWithHeader();
    const uri = this.apiService.currentWeather(location);

    return this.httpClient.get<Weather>(uri, httpOptions);
  }



}
