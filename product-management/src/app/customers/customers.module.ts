import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../shared/shared.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer/customer.component';
import { PendingChangesGuard, AddGuard, UpdateGuard } from '../shared/guards';
import { CustomerService } from './customer.service';

const routes: Routes = [
  { path: 'list', component: CustomerListComponent },
  { path: 'add', component: CustomerComponent, canDeactivate: [PendingChangesGuard],
    canActivate: [AddGuard] },
  { path: ':customerId', component: CustomerComponent,
    canDeactivate: [PendingChangesGuard], canActivate: [UpdateGuard] },
  { path: '', redirectTo:'list', pathMatch: 'full' },
];

@NgModule({
  declarations: [CustomerListComponent, CustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    ReactiveFormsModule, FormsModule,
    MatTableModule,
    SharedModule
  ],
  providers: [CustomerService]
})
export class CustomersModule { }
