import { Injectable } from '@angular/core';
import { PrayerLatinName } from '../model/prayer-latin-name';
import { PrayerArabicName } from '../model/prayer-arabic-name';
import { LocationDisplayName } from '../model/location-display-name';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() {}

  translateToLatin(prayerName: string): string {
    return PrayerLatinName[prayerName];
  }

  translateToArabic(prayerName: string): string {
    return PrayerArabicName[prayerName];
  }

  translateToDisplayName(location: Location): string {
    return LocationDisplayName[location];
  }

}
