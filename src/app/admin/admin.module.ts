import { ProductStatisticsComponent } from './components/product-statistics/product-statistics.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { GoogleChartsModule } from 'angular-google-charts';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    GoogleChartsModule,
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent },
      { path: 'admin/products/details/:id', component: ProductDetailsComponent },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/statistics', component: ProductStatisticsComponent },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ])
  ],
  declarations: [
    ProductFormComponent,
    ProductStatisticsComponent,
    ProductDetailsComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
