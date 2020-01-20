import { Injectable } from '@angular/core';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
  }

  /**
   * Returns the name of the city of the current location
   */
  getLocation() {
    return Location.Mainz;
  }
}
