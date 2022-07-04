import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PendingChangesGuard } from 'src/app/shared/guards';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, PendingChangesGuard {
  public customerId = null;
  public hide = true;
  public confirmHide = true;
  public customerForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    contactNumber: new FormControl('', [Validators.required]),
    address: new FormGroup({
      house: new FormControl(''),
      street: new FormControl(''),
      area: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl('')
    })
  });
  constructor(private route: ActivatedRoute, private router: Router, private service: CustomerService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.customerId = params.get('customerId');
      if (this.customerId) {
        this.getCustomerInfo();
      }
    });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if (this.customerForm.dirty) {
      return false;
    } else {
      return true;
    }
  }

  getCustomerInfo() {
    // from api
    this.service.getCustomerData(this.customerId).subscribe((response: any) => {
        if (response) {
          this.customerForm.patchValue({
            id: response.id,
            name: response.name,
            email: response.email,
            password: response.password,
            confirmPassword: response.password,
            contactNumber: response.contactNumber,
            address: {
              house: response.address.house,
              street: response.address.street,
              area: response.address.area,
              city: response.address.city,
              state: response.address.state,
              country: response.address.country
            }
          });
        }
      });
  }

  onSubmit() {
    // save api
    this.service.saveCustomerData(this.customerForm.value, this.customerId).subscribe((response) => {
      this.customerForm.reset();
      this.router.navigate(['customers']);
    })
  }

}
