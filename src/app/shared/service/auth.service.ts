import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userName = 'prayer';
  private password = 'f6a74846-d348-442b-9f6d-c2441e6cf639';

  constructor() {
  }

  getBasic(): string {
    return 'Basic ' + btoa(this.userName + ':' + this.password);
  }

  getBasicWithHeader() {
    return {
      headers: new HttpHeaders({
        Authorization: this.getBasic()
      })
    };
  }

}
