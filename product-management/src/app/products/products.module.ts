import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from './../shared/shared.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { AddGuard, PendingChangesGuard, UpdateGuard } from '../shared/guards';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'list', component: ProductListComponent },
  { path: 'add', component: ProductComponent,
    canDeactivate: [PendingChangesGuard], canActivate: [AddGuard] },
  { path: ':prodId', component: ProductComponent,
    canDeactivate: [PendingChangesGuard], canActivate: [UpdateGuard] },
  { path: '', redirectTo:'list', pathMatch: 'full' },
];

@NgModule({
  declarations: [ProductListComponent, ProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    FormsModule,
    MatTableModule,
    SharedModule
  ],
  providers: [ProductService]
})
export class ProductsModule { }
