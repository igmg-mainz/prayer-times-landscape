import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/service/weather.service';
import { Observable } from 'rxjs';
import { Weather } from '../shared/model/weather';
import { Location } from '../shared/model/location';

@Component({
  selector: 'cr-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  private currentWeather$: Observable<Weather>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.currentWeather$ = this.weatherService.getCurrentWeatherOfLocation(Location.Mainz);
  }

  getTemperature(currentWeather: Weather) {
    return Math.ceil(currentWeather.main.temp);
  }
}
