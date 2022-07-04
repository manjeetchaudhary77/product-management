import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public productList = [];
  public search = '';

  constructor(private router: Router, private service: ProductService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.service.getProductList().subscribe((response: any[]) => {
      this.productList = response;
    })
  }

  addNewProduct() {
    this.router.navigate([`products/add`]);
  }

  editProduct(item) {
    if (item.id) {
      this.router.navigate([`products/${item.id}`]);
    }
  }
}
