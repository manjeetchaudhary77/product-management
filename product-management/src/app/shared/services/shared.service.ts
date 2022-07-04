import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  loginUser = new Subject();
  constructor() { }

  setUserInfo(data) {
    if (data) {
      sessionStorage.setItem('userInfo', JSON.stringify(data)); // set in sessionstorage
    } else {
      sessionStorage.clear();      
    }
    this.loginUser.next(data);
  }

  getUserInfoSubject() {
    return this.loginUser.asObservable();
  }
}
