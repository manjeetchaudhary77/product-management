import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UserService } from "../services/user.service";


@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private router: Router, private userService: UserService) {
   }
   canActivate(): boolean | UrlTree {
       return this.userService.getUserLoggedIn() ||
              this.router.parseUrl('login');
   }
}