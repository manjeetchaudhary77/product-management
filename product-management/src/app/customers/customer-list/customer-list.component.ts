import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  public customerList = [];
  public search = '';

  constructor(private router: Router, private service: CustomerService) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList() {
    this.service.getCustomerList().subscribe((response: any[]) => {
      this.customerList = response;
    })
  }

  addNewCustomer() {
    this.router.navigate([`customers/add`]);
  }

  editCustomer(item) {
    if (item.id) {
      this.router.navigate([`customers/${item.id}`]);
    }
  }

}
