import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../login.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public loginForm: FormGroup;
  public hide: boolean = true;

  constructor(private router: Router, private sharedService: SharedService,
    private service: LoginService, private snackbar: MatSnackBar) {
    this.loginForm = new FormGroup({
      password: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  guestLogin() {
    this.sharedService.setUserInfo({type: 'guest'});
    this.router.navigate(['products'])
  }

  onSubmit(form: FormGroup) {
    if (form.value.email && form.value.password) {
      this.service.getLoginCredentials().subscribe((response: any[]) => {
        let found = false;
        if (response) {
          for (const iterator of response) {
            if (iterator.email == form.value.email) {
              if (iterator.password == form.value.password) {
                found = true;
                this.sharedService.setUserInfo(iterator);
                this.router.navigate([''])
              } else {
              this.snackbar.open('Invalid Password', 'ok' , {duration: 5000});
              }
              break;
            }
          }
          if (!found) {
            this.snackbar.open('Invalid email', 'ok' , {duration: 5000,});
          }
        }
      })
    }
  }
}
