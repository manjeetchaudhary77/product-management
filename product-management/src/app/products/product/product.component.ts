import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PendingChangesGuard } from 'src/app/shared/guards';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, PendingChangesGuard {
  @ViewChild('productForm') form: NgForm;
  public prodId = null;
  public product = {
    id: null, name: '', category: '', rating: null
  };
  public categoryList = [];
  public ratings = [];
  constructor(private route: ActivatedRoute, private router: Router, private service: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.prodId = params.get('prodId');
      if (this.prodId) {
        this.getProductInfo();
      }
    });
    this.categoryList = [
      'Electronic Appliance', 'Furniture', 'Vehcile'
    ];
    this.ratings = [1,2,3,4,5];
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      return false;
    } else {
      return true;
    }
  }

  getProductInfo() {
    this.service.getProductData(this.prodId).subscribe((response: any) => {
      if (response) {
        this.product = response;
      }
    });  
  }

  onSubmit() {
    this.service.saveProductData(this.form.value, this.prodId).subscribe((response) => {
      // save api
      this.form.reset();
      this.router.navigate(['products']);
    })
  }
}
