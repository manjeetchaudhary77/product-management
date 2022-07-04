import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  getUserInfo() {
      if (sessionStorage.getItem('userInfo')) {
          return JSON.parse(sessionStorage.getItem('userInfo'));
      }
      return null;
  }

  getUserLoggedIn() {
    if (sessionStorage.getItem('userInfo')) {
        return true;
    }
    return false;
  }
}
