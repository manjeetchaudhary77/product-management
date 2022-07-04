import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from './shared/services/shared.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'product-management';
  isUserLoggedIn = false;
  userInfo: any;
  subscription: Subscription;
  constructor(private route: Router, private sharedService: SharedService, private userService: UserService) {
    this.subscription = this.sharedService.getUserInfoSubject().subscribe(res => {
      if (res) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
      this.userInfo = res;
    });
  }

  ngOnInit(): void {
    if (this.userService.getUserLoggedIn()) {
      this.isUserLoggedIn = true;
      this.userInfo = this.userService.getUserInfo();
    }

  }

  logout() {
    this.sharedService.setUserInfo(null);
    this.route.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
