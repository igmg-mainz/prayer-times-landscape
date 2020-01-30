import { Injectable } from '@angular/core';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private uri = 'https://h2861894.stratoserver.net/services/DigitalPrayerServer/';
  private uri = 'http://localhost:8092/';

  constructor() {
  }

  prayersUri(location: Location) {
    return `${this.uri}/prayers/location/${location}?month=`;
  }

  randomAsma() {
    return `${this.uri}/asma`;
  }

  randomSurah() {
    return `${this.uri}/quran/surah/random`;
  }

  currentWeather(location: Location) {
    return `${this.uri}/weather/${location}`;
  }

  announcements() {
    return `${this.uri}/announcements`;
  }

  announcement(announcementId: string) {
    return `${this.uri}/announcements/${announcementId}`;
  }

  announcementImage(name: string) {
    return `${this.uri}/announcements/image/${name}`;
  }
}
