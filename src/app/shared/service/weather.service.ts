import { Injectable } from '@angular/core';
import { Location } from '../model/location';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Weather } from '../model/weather';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getCurrentWeatherOfLocation(location: Location): Observable<Weather> {
    const httpOptions = this.authService.getBasicWithHeader();
    const uri = `https://h2861894.stratoserver.net/services/DigitalPrayerServer/weather/${location}`;
    return this.httpClient.get<Weather>(uri, httpOptions);
  }



}
