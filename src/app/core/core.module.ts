import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from '../shopping/components/products/products.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ProductsComponent },
    { path: 'login', component: LoginComponent },])
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    BsNavbarComponent
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
