import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomerList() {
    return this.http.get('http://localhost:3000/customers');
  }

  getCustomerData(id: string) {
    return this.http.get(`http://localhost:3000/customers/${id}`);
  }

  saveCustomerData(payload, id) {
    if (id) {
      return this.http.put(`http://localhost:3000/customers/${parseInt(id)}`, payload);
    } else {
      return this.http.post(`http://localhost:3000/customers`, payload);
    }
  }
}
