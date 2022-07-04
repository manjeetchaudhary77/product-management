import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UserService } from "../services/user.service";


@Injectable()
export class UpdateGuard implements CanActivate {
   constructor(private router: Router, private userService: UserService) {
   }
   canActivate(): boolean | UrlTree {
      const userInfo = this.userService.getUserInfo();
      if (userInfo && userInfo.type == 'admin') {
         return true;
      }
      alert("You don't have permission");
      this.router.navigate(['']);
   }
}