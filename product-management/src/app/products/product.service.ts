import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get('http://localhost:3000/products');
  }

  getProductData(id: string) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  saveProductData(payload, prodId) {
    if (prodId) {
      return this.http.put(`http://localhost:3000/products/${parseInt(prodId)}`, payload);
    } else {
      return this.http.post('http://localhost:3000/products', payload);
    }
  }
}
