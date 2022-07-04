import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public name: string = '';
  public email: string = '';
  public desc: string = '';
  constructor() { }

  ngOnInit(): void {
    this.name = 'Manjeet Kumar Chaudhary';
    this.email = 'manjeet@user.com';
    this.desc = 'Head of Product Management';
  }

}
