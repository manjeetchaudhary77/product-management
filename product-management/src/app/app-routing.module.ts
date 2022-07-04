import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'products', canActivate: [AuthGuard], loadChildren: () => import(`./products/products.module`).then(m => m.ProductsModule)},
  { path: 'customers', canActivate: [AuthGuard], loadChildren: () => import(`./customers/customers.module`).then(m => m.CustomersModule)},
  { path: 'login', loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
